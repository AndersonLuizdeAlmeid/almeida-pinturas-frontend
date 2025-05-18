import { CreateUserRequest } from "@/types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { toast } from "sonner";
import * as authService from "./../app/services/authService";

const TOKEN_KEY = "token";

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateUser = async (userData: CreateUserRequest) => {
    setLoading(true);
    setError(null);

    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error();

      const response = await fetch(`/Users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          authService.logout();
          return;
        }
        throw new Error();
      }

      toast.success("Usuário alterado com sucesso");

      return userData;
    } catch (err) {
      toast.error("Erro ao alterar funcionário.");
      setSuccess(false);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error, success };
};
