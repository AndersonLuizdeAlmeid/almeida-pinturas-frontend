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

type Wall = {
  width: number;
  height: number;
  area: number;
};

export default function CalculatePage() {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [walls, setWalls] = useState<Wall[]>([]);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

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

  const totalArea = walls.reduce((sum, wall) => sum + wall.area, 0);

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-10 space-y-6">
        <h1 className="text-2xl font-bold">Cálculo de Metragem Cúbica</h1>

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
            <Dialog open={confirmClearOpen} onOpenChange={setConfirmClearOpen}>
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
          )}
        </div>
      </div>
    </Layout>
  );
}
