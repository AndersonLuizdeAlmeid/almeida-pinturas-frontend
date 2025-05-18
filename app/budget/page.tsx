"use client";

import { useState, useEffect } from "react";
import { Input } from "@/app/components/components/ui/input";
import { Button } from "@/app/components/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/app/components/components/ui/card";
import Layout from "../layout-bar";
import { toast } from "sonner";
import { generatePDF } from "@/utils/generatePdf";
import { BudgetView, Item } from "@/types/Budget";
import { useBudgets } from "@/hooks/useBudget";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/components/ui/dialog";
import { Trash } from "lucide-react";
import { openFile } from "@/utils/openFile";

export default function OrcamentoPage() {
  const { budgets, loading, fetchBudgets, addBudget, deleteBudget } =
    useBudgets();

  const [budgetView, setBudgetView] = useState<BudgetView>({
    id: "",
    clientName: "",
    clientCnpj: "",
    clientAddress: "",
    clientPhone: "",
    description: "",
    documentDate: new Date(),
    items: [],
  });
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleChange = <K extends keyof BudgetView>(
    key: K,
    value: BudgetView[K]
  ) => {
    setBudgetView((prev) => ({ ...prev, [key]: value }));
  };

  const addItem = () => {
    const price = parseFloat(itemPrice);
    if (!itemName || isNaN(price)) {
      toast.error("Preencha o nome e o preço do item corretamente.");
      return;
    }
    const newItem: Item = { name: itemName, price };
    setBudgetView((prev) => ({ ...prev, items: [...prev.items, newItem] }));
    setItemName("");
    setItemPrice("");
  };

  const handleSave = async () => {
    const file = await generatePDF(budgetView);
    if (!file) return;

    // Salva via addBudget, passando o content como File
    await addBudget({
      id: budgetView.id,
      name: budgetView.clientName,
      dateCreated: budgetView.documentDate,
      content: file,
    });

    setSaveDialogOpen(false);
    setBudgetView({
      id: "",
      clientName: "",
      clientCnpj: "",
      clientAddress: "",
      clientPhone: "",
      description: "",
      documentDate: new Date(),
      items: [],
    });
  };

  const handleDelete = async (id: string) => {
    console.log(id);
    await deleteBudget(id);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-10 space-y-6">
        <div className="flex items-center justify-center">
          <Card className="w-full  max-w-md shadow-lg rounded-xl bg-white">
            <CardHeader className="flex flex-col items-center text-center">
              <CardTitle className="text-2xl font-bold card-foreground">
                ALMEIDA PINTURAS
              </CardTitle>
              <CardDescription className="card-foreground">
                Orçamentos
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <Card className="shadow-lg rounded-xl bg-white p-6">
          <CardContent className="space-y-4">
            <Input
              placeholder="Nome do Cliente"
              value={budgetView.clientName}
              onChange={(e) => handleChange("clientName", e.target.value)}
            />
            <Input
              placeholder="CNPJ"
              value={budgetView.clientCnpj}
              onChange={(e) => handleChange("clientCnpj", e.target.value)}
            />
            <Input
              placeholder="Endereço"
              value={budgetView.clientAddress}
              onChange={(e) => handleChange("clientAddress", e.target.value)}
            />
            <Input
              placeholder="Telefone"
              value={budgetView.clientPhone}
              onChange={(e) => handleChange("clientPhone", e.target.value)}
            />
            <Input
              placeholder="Descrição"
              value={budgetView.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
            <Input
              type="date"
              value={budgetView.documentDate.toISOString().slice(0, 10)}
              onChange={(e) =>
                handleChange("documentDate", new Date(e.target.value))
              }
            />
            <div className="flex gap-2">
              <Input
                placeholder="Nome do Item"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <Input
                placeholder="Preço"
                type="number"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
              />
              <Button onClick={addItem}>Adicionar</Button>
            </div>
            {budgetView.items.length > 0 && (
              <ul className="mt-4 space-y-2">
                {budgetView.items.map((it, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{it.name}</span>
                    <span>R$ {it.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => setSaveDialogOpen(true)}
              className="w-full bg-green-600 text-white"
            >
              Salvar Orçamento
            </Button>
          </CardFooter>
        </Card>

        <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Salvamento</DialogTitle>
            </DialogHeader>
            <p>Deseja salvar este orçamento?</p>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setSaveDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleSave}>Confirmar</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Card className="shadow-lg rounded-xl bg-white p-6">
          <h2 className="text-xl font-semibold">Orçamentos Salvos</h2>
          {loading && <p>Carregando...</p>}
          {!loading && budgets.length === 0 && <p>Nenhum orçamento salvo.</p>}
          <ul className="space-y-3">
            {budgets.map((b) => (
              <li
                key={b.id}
                className="bg-gray-100 p-4 rounded flex justify-between items-center"
              >
                <span>
                  {b.name} - {new Date(b.dateCreated).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      openFile(b.content);
                    }}
                  >
                    PDF
                  </Button>
                  <Button
                    size="sm"
                    className="bg-red-600 text-foreground hover:bg-red-700"
                    onClick={() => handleDelete(b.id)}
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Layout>
  );
}
