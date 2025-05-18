// hooks/useCreateUser.ts
import { CreateUserRequest } from "@/types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { toast } from "sonner";
import * as authService from "./../app/services/authService";

const TOKEN_KEY = "token";

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createUser = async (newUser: CreateUserRequest) => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error();
      const response = await fetch(`/Users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        if (response.status === 401) authService.logout();
        throw new Error();
      }

      const data = await response.json();
      setSuccess(true);
      toast.success("Usuário criado com sucesso");
      return data;
    } catch (err) {
      toast.error("Erro ao criar novo funcionário.");
      setSuccess(false);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error, success };
};
