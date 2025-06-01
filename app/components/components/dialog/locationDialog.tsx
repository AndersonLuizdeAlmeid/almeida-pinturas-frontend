"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/components/ui/dialog";
import { Input } from "@/app/components/components/ui/input";
import { Button } from "@/app/components/components/ui/button";
import { useEffect, useState } from "react";
import { Location } from "@/types/Location";

export default function LocationDialog({
  onSave,
  onClose,
  open,
}: {
  onSave: (location: Location) => void;
  onClose: () => void;
  open: boolean;
}) {
  const [newLocation, setNewLocation] = useState<Location>({
    id: 0,
    description: "",
    isFinished: 0,
  });

  useEffect(() => {
    if (open) {
      setNewLocation({ id: 0, description: "", isFinished: 0 });
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLocation({ ...newLocation, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (newLocation.description.trim() === "") return;
    onSave(newLocation);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[400px] rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-primary">
            Adicionar Local
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 mt-4">
          <div className="grid gap-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="description"
            >
              Descrição
            </label>
            <Input
              id="description"
              name="description"
              placeholder="Ex: Matriz, Unidade Zona Sul, etc."
              value={newLocation.description}
              onChange={handleChange}
            />
          </div>

          <Button
            className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleSave}
          >
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
