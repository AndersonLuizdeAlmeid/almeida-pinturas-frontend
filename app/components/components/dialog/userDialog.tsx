"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/components/ui/dialog";
import { Input } from "@/app/components/components/ui/input";
import { Button } from "@/app/components/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { User } from "@/types/User";

export default function UserDialog({
  onSave,
}: {
  onSave: (user: User) => void;
}) {
  const [newUser, setNewUser] = useState({
    id: 0,
    name: "",
    cpf: "",
    email: "",
    password: "123456",
    phoneNumber: "",
    birthdayDate: "",
    address: "",
    isActive: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(newUser);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="fixed bottom-6 right-6 bg-card-foreground text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition">
          <Plus size={24} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Funcionário</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input name="name" placeholder="Nome" onChange={handleChange} />
          <Input name="cpf" placeholder="CPF" onChange={handleChange} />
          <Input name="email" placeholder="Email" onChange={handleChange} />
          <Input
            name="phoneNumber"
            placeholder="Telefone"
            onChange={handleChange}
          />
          <Input type="date" name="birthdayDate" onChange={handleChange} />
          <Input
            name="address"
            placeholder="Endereço"
            onChange={handleChange}
          />
          <Button className="w-full" onClick={handleSave}>
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
