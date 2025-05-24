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
import { User } from "@/types/User";
import { formatDateForInputDateField } from "@/utils/dateUtils";

export default function UserDialog({
  onSave,
  user,
  onClose,
  open,
}: {
  onSave: (user: User) => void;
  user?: User | null;
  onClose: () => void;
  open: boolean;
}) {
  const [newUser, setNewUser] = useState<User>({
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

  useEffect(() => {
    if (user) {
      console.log(user);
      setNewUser({ ...user });
    } else {
      setNewUser({
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
    }
  }, [user, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(newUser);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[500px] rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-primary">
            {user ? "Editar Funcionário" : "Adicionar Funcionário"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 mt-4">
          <div className="grid gap-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="name"
            >
              Nome
            </label>
            <Input
              id="name"
              name="name"
              placeholder="Fulano de Tal"
              value={newUser.name}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="cpf"
            >
              CPF
            </label>
            <Input
              id="cpf"
              name="cpf"
              placeholder="02774572028"
              value={newUser.cpf}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="email"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              placeholder="example@example.com"
              value={newUser.email}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="phoneNumber"
            >
              Telefone
            </label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="54 997020255"
              value={newUser.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="birthdayDate"
            >
              Data de Nascimento
            </label>
            <Input
              id="birthdayDate"
              type="date"
              name="birthdayDate"
              value={formatDateForInputDateField(newUser.birthdayDate)}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="address"
            >
              Endereço
            </label>
            <Input
              id="address"
              name="address"
              placeholder="Evaristo Canal, 186 - CB"
              value={newUser.address}
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
