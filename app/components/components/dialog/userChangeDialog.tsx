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
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { User } from "@/types/User";
import { formatDateForInputDateField } from "@/utils/dateUtils";

export default function UserChangeDialog({
  onSave,
  user,
}: {
  onSave: (user: User) => void;
  user: User | null;
}) {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    setUserData(user); // Atualiza os dados quando o usuário mudar
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!userData) return;
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (userData) onSave(userData);
  };

  const handleSaveInvalid = () => {
    if (userData) {
      userData.isActive = 0;
      onSave(userData);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          disabled={!user}
          className={`fixed bottom-6 right-8 p-4 rounded-full shadow-lg transition ${
            user
              ? "bg-primary text-white hover:bg-primary/90"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          <Edit size={24} />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-primary">
            Alterar Funcionário
          </DialogTitle>
        </DialogHeader>

        {userData && (
          <div className="grid gap-4 mt-4">
            <div className="grid gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Nome
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Nome"
                value={userData.name}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="cpf"
                className="text-sm font-medium text-foreground"
              >
                CPF
              </label>
              <Input
                id="cpf"
                name="cpf"
                placeholder="CPF"
                value={userData.cpf}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="phoneNumber"
                className="text-sm font-medium text-foreground"
              >
                Telefone
              </label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Telefone"
                value={userData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="birthdayDate"
                className="text-sm font-medium text-foreground"
              >
                Data de Nascimento
              </label>
              <Input
                id="birthdayDate"
                type="date"
                name="birthdayDate"
                value={formatDateForInputDateField(userData.birthdayDate)}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="address"
                className="text-sm font-medium text-foreground"
              >
                Endereço
              </label>
              <Input
                id="address"
                name="address"
                placeholder="Endereço"
                value={userData.address}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <Button
                className="w-full bg-primary text-white hover:bg-primary/90"
                onClick={handleSave}
              >
                Salvar
              </Button>
              <Button
                className="w-full bg-destructive text-white hover:bg-destructive/90"
                onClick={handleSaveInvalid}
              >
                Invalidar
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
