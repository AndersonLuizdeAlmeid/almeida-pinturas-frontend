"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/components/ui/dialog";
import { Input } from "@/app/components/components/ui/input";
import { Button } from "@/app/components/components/ui/button";
import { useState } from "react";
import { DocumentFile } from "@/types/Document";
import { formatDateForInput } from "@/utils/dateUtils";

export default function UserDocumentsDialog({
  onSave,
  isOpen,
  onOpenChange,
}: {
  onSave: (file: DocumentFile) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [file, setFile] = useState<DocumentFile | null>(null);
  const [dateExpire, setDateExpire] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile({ file: selectedFile });
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateExpire(e.target.value);
  };

  const handleSave = async () => {
    if (!file) {
      alert("Selecione um arquivo.");
      return;
    }

    await onSave({ ...file, expirationDate: dateExpire }); // aqui envia a data também
    setFile(null);
    setDateExpire("");
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-primary">
            Adicionar Documento
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 mt-4">
          <div className="grid gap-2">
            <label
              htmlFor="documentFile"
              className="text-sm font-medium text-foreground"
            >
              Arquivo
            </label>
            <Input
              id="documentFile"
              type="file"
              accept="*"
              onChange={handleFileChange}
            />
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="expirationDate"
              className="text-sm font-medium text-foreground"
            >
              Data de Expiração
            </label>
            <Input
              id="expirationDate"
              type="date"
              name="expirationDate"
              value={formatDateForInput(dateExpire)}
              onChange={handleDateChange}
            />
          </div>

          <Button
            className="w-full bg-primary text-white hover:bg-primary/90 mt-2"
            onClick={handleSave}
          >
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
