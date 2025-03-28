"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/components/ui/table";
import { useUsers } from "@/hooks/useUsers";
import { Loader2, AlertCircle } from "lucide-react";
import { formatDate } from "@/utils/dateUtils";
import UserDialog from "@/app/components/components/dialog/userDialog";
import { useCreateUser } from "@/hooks/useCreateUser";
import { User } from "@/types/User";

export default function UsersScreen() {
  const { users, loading, error } = useUsers();
  const { createUser } = useCreateUser(); // Usando o hook para criar usuário

  const handleSaveUser = async (user: User) => {
    const userData = {
      User: {
        id: 0,
        name: user.name,
        cpf: user.cpf,
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber,
        birthdayDate: user.birthdayDate,
        address: user.address,
        isActive: 1,
      },
    };

    // Chamando a função de criação com o formato esperado
    await createUser(userData);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <Card className="w-full max-w-md shadow-lg rounded-xl bg-white">
        <CardHeader className="flex flex-col items-center text-center">
          <CardTitle className="text-2xl font-bold card-foreground">
            ALMEIDA PINTURAS
          </CardTitle>
          <CardDescription className="card-foreground">
            Gerenciamento de funcionários
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="w-full max-w-5xl mt-6 p-2 bg-white rounded-xl shadow-lg">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
            <p className="text-blue-500 mt-2 text-lg font-medium">
              Carregando usuários...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-10 text-red-500">
            <AlertCircle className="w-8 h-8" />
            <p className="mt-2 text-lg font-medium">Erro: {error}</p>
          </div>
        ) : (
          <Table className="border border-gray-200 rounded-lg overflow-hidden">
            <TableHeader className="bg-sidebar text-white">
              <TableRow>
                <TableHead className="p-3">Funcionário</TableHead>
                <TableHead className="p-3">CPF</TableHead>
                <TableHead className="p-3">Email</TableHead>
                <TableHead className="p-3">Telefone</TableHead>
                <TableHead className="p-3">Nascimento</TableHead>
                <TableHead className="p-3">Endereço</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <TableCell className="p-3">{user.name}</TableCell>
                  <TableCell className="p-3">{user.cpf}</TableCell>
                  <TableCell className="p-3">{user.email}</TableCell>
                  <TableCell className="p-3">{user.phoneNumber}</TableCell>
                  <TableCell className="p-3">
                    {formatDate(user.birthdayDate)}
                  </TableCell>
                  <TableCell className="p-3">{user.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <UserDialog onSave={handleSaveUser} />
    </div>
  );
}
