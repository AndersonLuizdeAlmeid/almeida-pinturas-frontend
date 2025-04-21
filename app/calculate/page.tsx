"use client";

import { useState } from "react";
import { Input } from "@/app/components/components/ui/input";
import { Button } from "@/app/components/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/components/ui/dialog";
import Layout from "../layout-bar";
import { toast } from "sonner";
import {
  CreateMeasureRequest,
  MeasureResponse,
  SeparateMeasureRequest,
  Wall,
} from "@/types/Measure";
import { useMeasure } from "@/hooks/useMeasure";
import { useEffect } from "react";
import { Trash } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/components/ui/card";

export default function CalculatePage() {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [walls, setWalls] = useState<Wall[]>([]);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  const { createMeasure, getMeasures, deleteMeasure } = useMeasure();
  const [measures, setMeasures] = useState<MeasureResponse[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [reload, setIsReload] = useState(false);

  const fetchMeasures = async () => {
    if (reload) {
      const result = await getMeasures();
      setMeasures(result);
      setIsReload(false);
    }
  };

  useEffect(() => {
    fetchMeasures();
  }, [reload]);

  const handleAddWall = () => {
    const parsedWidth = parseFloat(width);
    const parsedHeight = parseFloat(height);

    if (isNaN(parsedWidth) || isNaN(parsedHeight)) {
      toast.error("Preencha valores válidos.");
      return;
    }

    if (parsedWidth <= 0 || parsedHeight <= 0) {
      toast.error("Os valores tem de ser maiores que 0.");
      return;
    }

    const area = parsedWidth * parsedHeight;
    const newWall: Wall = { width: parsedWidth, height: parsedHeight, area };

    setWalls([...walls, newWall]);
    setWidth("");
    setHeight("");
  };

  const handleClearAll = () => {
    setWalls([]);
    setConfirmClearOpen(false);
  };

  const handleSave = async () => {
    if (walls.length === 0) {
      toast.error("Nenhuma parede adicionada para salvar.");
      return;
    }

    const payload: CreateMeasureRequest = {
      description: description || "Cálculo automático", // usa a descrição digitada
      area: totalArea,
      separates: walls.map((wall) => ({
        width: wall.width,
        height: wall.height,
      })),
    };

    await createMeasure(payload);
    setWalls([]);
    setIsReload(true);
  };

  const handleDeleteMeasure = async (id: number) => {
    await deleteMeasure(id);
    setIsReload(true);
  };

  const totalArea = walls.reduce((sum, wall) => sum + wall.area, 0);

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
                Cálculo de Metragem Cúbica
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            placeholder="Largura (m)"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Altura (m)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <Button className="w-full" onClick={handleAddWall}>
          Adicionar Cálculo
        </Button>

        <div className="bg-white rounded-lg shadow p-4 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Paredes Adicionadas</h2>
            {walls.length === 0 ? (
              <p className="text-gray-500">Nenhuma parede adicionada ainda.</p>
            ) : (
              <ul className="space-y-2">
                {walls.map((wall, index) => (
                  <li key={index} className="flex justify-between">
                    <span>
                      {wall.width}m x {wall.height}m
                    </span>
                    <span>{wall.area.toFixed(2)} m²</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="pt-4 border-t font-bold text-lg">
            Total: {totalArea.toFixed(2)} m²
          </div>

          {walls.length > 0 && (
            <>
              {/* Dialog para SALVAR CÁLCULO */}
              <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Salvar Cálculo
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Salvar Cálculo</DialogTitle>
                  </DialogHeader>
                  <Input
                    placeholder="Descrição do cálculo"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setSaveDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={async () => {
                        await handleSave();
                        setSaveDialogOpen(false);
                        setDescription("");
                      }}
                    >
                      Confirmar
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog
                open={confirmClearOpen}
                onOpenChange={setConfirmClearOpen}
              >
                <DialogTrigger asChild>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Limpar Tudo
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tem certeza?</DialogTitle>
                  </DialogHeader>
                  <p>Essa ação irá remover todos os cálculos adicionados.</p>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setConfirmClearOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      className="bg-red-600 hover:bg-red-700"
                      onClick={handleClearAll}
                    >
                      Confirmar
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}

          <div className="pt-6">
            <h2 className="text-lg font-semibold mb-2">Medições Salvas</h2>
            {measures.length === 0 ? (
              <p className="text-gray-500">Nenhuma medição salva.</p>
            ) : (
              <ul className="space-y-3">
                {measures.map((measure, index) => (
                  <li
                    key={measure.id}
                    className="bg-gray-100 p-3 rounded-lg shadow cursor-pointer"
                    onClick={() =>
                      setExpandedIndex(index === expandedIndex ? null : index)
                    }
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{measure.description}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          {measure.separates.length} separações
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // impedir que o clique expanda
                            handleDeleteMeasure(parseInt(measure.id));
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>

                    {expandedIndex === index && (
                      <ul className="mt-3 space-y-1 text-sm text-gray-700">
                        {measure.separates.map(
                          (s: SeparateMeasureRequest, idx: number) => (
                            <li
                              key={idx}
                              className="flex justify-between border-b border-gray-200 pb-1"
                            >
                              <span>
                                {s.width}m x {s.height}m
                              </span>
                              <span>{(s.width * s.height).toFixed(2)} m²</span>
                            </li>
                          )
                        )}
                        <li className="flex justify-between border-b border-gray-200 bg-blue-300 pb-1 rounded-t">
                          <span>Area total:</span>
                          <span>{measure.area.toFixed(2)} m²</span>
                        </li>
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
