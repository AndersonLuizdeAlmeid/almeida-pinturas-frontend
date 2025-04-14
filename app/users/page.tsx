"use client";
import { useEffect, useState } from "react";
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
import { Loader2, AlertCircle, Plus } from "lucide-react";
import UserDialog from "@/app/components/components/dialog/userDialog";
import { useCreateUser } from "@/hooks/useCreateUser";
import { User } from "@/types/User";
import UserDocuments from "../components/components/dialog/userDocuments";
import { Button } from "../components/components/ui/button";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import Layout from "../layout-bar";

export default function UsersScreen() {
  const { users, loading, error, fetchUsers } = useUsers();
  const { createUser } = useCreateUser();
  const { updateUser } = useUpdateUser();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reload, setIsReload] = useState(false);

  useEffect(() => {
    if (reload) {
      fetchUsers();
      setIsReload(false);
    }
  }, [reload]);

  const handleOpenDialog = (user?: User) => {
    setUserToEdit(user || null);
    setIsDialogOpen(true);
  };

  const handleInvalidUser = async (user: User) => {
    const userData = {
      User: {
        id: user.id,
        name: user.name,
        cpf: user.cpf,
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber,
        birthdayDate: user.birthdayDate,
        address: user.address,
        isActive: 0,
      },
    };
    await updateUser(userData);
    setIsReload(true);
  };

  const handleSaveUser = async (user: User) => {
    console.log(user);
    if (user.id === 0) {
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
      await createUser(userData);
      setUserToEdit(null);
      setIsReload(true);
    } else {
      const userData = {
        User: {
          id: user.id,
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
      await updateUser(userData);
      setIsReload(true);
    }
  };

  const handleRowClick = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (!user || user.isActive === 0) return;

    setSelectedUserId((prevId) => (prevId === userId ? null : userId));
  };

  return (
    <Layout>
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
                  <TableHead className="p-3"></TableHead>
                  <TableHead className="p-3"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <>
                    <TableRow
                      key={user.id}
                      className={`cursor-pointer hover:bg-gray-900 transition duration-200 ${
                        user.isActive === 0 ? "bg-red-500 hover:bg-red-600" : ""
                      }`}
                      onClick={() => handleRowClick(user.id)}
                    >
                      <TableCell className="p-3">{user.name}</TableCell>
                      <TableCell className="p-3">{user.cpf}</TableCell>
                      <TableCell className="p-3">{user.email}</TableCell>
                      <TableCell className="p-3">{user.phoneNumber}</TableCell>
                      {user.isActive !== 0 && (
                        <>
                          <TableCell className="p-3">
                            <Button
                              className="px-6 cursor-pointer hover:bg-gray-900 transition duration-200"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenDialog(user);
                              }}
                            >
                              Editar
                            </Button>
                          </TableCell>
                          <TableCell className="p-3">
                            <Button
                              className="px-10 bg-red-600 hover:bg-red-700 text-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleInvalidUser(user);
                              }}
                            >
                              Inativar
                            </Button>
                          </TableCell>
                        </>
                      )}

                      {user.isActive === 0 && (
                        <>
                          <TableCell className="p-3" colSpan={2}>
                            <span className="text-red-700 font-semibold">
                              Usuário Inativo
                            </span>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                    {selectedUserId === user.id && user.isActive === 1 && (
                      <tr>
                        <td colSpan={7}>
                          <UserDocuments userId={user.id} />
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        <button
          onClick={() => {
            handleOpenDialog();
            setUserToEdit(null);
          }}
          className="fixed bottom-6 right-10 bg-card-foreground text-white p-4 rounded-full shadow-lg hover:bg-gray-900 transition"
        >
          <Plus size={40} />
        </button>
        <UserDialog
          key={userToEdit ? `edit-${userToEdit.id}` : "new"}
          open={isDialogOpen}
          user={userToEdit}
          onSave={handleSaveUser}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>
    </Layout>
  );
}
