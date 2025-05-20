import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { toast } from "sonner";
import { Budget, BudgetShow } from "@/types/Budget";
import * as authService from "./../app/services/authService";

const TOKEN_KEY = "token";

export const useBudgets = () => {
  const [budgets, setBudgets] = useState<BudgetShow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error("Token não encontrado");

      const response = await fetch(`/Budgets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          authService.logout();
          return;
        }
        throw new Error("Erro ao buscar orçamentos");
      }

      const data = await response.json();
      console.log(data);
      if (data !== null) setBudgets(data);
    } catch (err) {
      toast.error("Erro ao buscar orçamentos do usuário.");
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const addBudget = async (budget: Budget) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);

      if (!token) throw new Error("Token não encontrado");

      // Monta o FormData
      const formData = new FormData();
      formData.append("file", budget.content, budget.content.name);
      formData.append("Id", budget.id);
      formData.append("Name", budget.name);
      formData.append("DateCreated", budget.dateCreated.toISOString());

      const response = await fetch(`/Budgets`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 401) {
          authService.logout();
          return;
        }
        throw new Error("Erro ao salvar o Orçamento");
      }

      toast.success("Orçamento salvo com sucesso");
      fetchBudgets();
    } catch (err) {
      toast.error("Erro ao salvar o Orçamento");
      console.log(err);
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const deleteBudget = async (budgetId: string) => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error("Token não encontrado");

      const response = await fetch(`/Budgets/${budgetId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          authService.logout();
          return;
        }
        throw new Error("Erro ao excluir o Orçamento");
      }

      toast.success("Orçamento excluído com sucesso!");
      setBudgets((prev) => prev.filter((budget) => budget.id !== budgetId));
    } catch (err) {
      toast.error("Erro ao excluir o Orçamento.");
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    }
  };

  return {
    budgets,
    loading,
    error,
    fetchBudgets,
    addBudget,
    deleteBudget,
  };
};
