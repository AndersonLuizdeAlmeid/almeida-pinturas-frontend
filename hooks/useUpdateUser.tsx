import { CreateUserRequest } from "@/types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
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

      const response = await fetch(`${API_URL}/Users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
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
