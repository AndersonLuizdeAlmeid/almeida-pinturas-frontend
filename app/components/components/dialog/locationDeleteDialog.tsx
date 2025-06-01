"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/components/components/ui/dialog";
import { Button } from "@/app/components/components/ui/button";
import { Location } from "@/types/Location";

interface DeleteLocationDialogProps {
  location: Location | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteLocationDialog({
  location,
  onConfirm,
  onCancel,
}: DeleteLocationDialogProps) {
  return (
    <Dialog open={!!location} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja excluir?</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600">
          Essa ação é irreversível. Todos os registros de horas da localização{" "}
          <strong>{location?.description}</strong> serão permanentemente
          removidos.
        </p>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button
            className="bg-foreground text-background hover:bg-foreground/80"
            variant="outline"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button
            className="bg-red-600 text-foreground hover:bg-red-700"
            onClick={onConfirm}
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
