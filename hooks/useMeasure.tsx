import { useState } from "react";
import { toast } from "sonner";
import { CreateMeasureRequest } from "@/types/Measure";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://45.10.154.254:5000"; // Atualize se necessário
const TOKEN_KEY = "token";

export const useMeasure = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createMeasure = async (data: CreateMeasureRequest) => {
    setLoading(true);
    setError(null);
    console.log(data);
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error();

      const res = await fetch(`${API_URL}/Measures/full`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      setSuccess(true);
      toast.success("Medição salva com sucesso!");
    } catch {
      toast.error("Erro ao salvar medição.");
      setError("Erro ao salvar medição.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const getMeasures = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error();

      const res = await fetch(`${API_URL}/Measures/full`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      return data;
    } catch {
      toast.error("Erro ao buscar medições.");
      setError("Erro ao buscar medições.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const deleteMeasure = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error();

      const res = await fetch(`${API_URL}/Measures/full/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error();
      toast.success("Medições apagadas com sucesso.");
      setSuccess(true);
    } catch {
      toast.error("Erro ao apagar medições.");
      setError("Erro ao apagar medições.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    createMeasure,
    getMeasures,
    deleteMeasure,
    loading,
    error,
    success,
  };
};
