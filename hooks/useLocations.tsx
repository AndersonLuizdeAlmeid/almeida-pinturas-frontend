import { useState } from "react";
import { toast } from "sonner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authService from "./../app/services/authService";
import { LocationRequest, WorkHoursRequest } from "@/types/Location";

const TOKEN_KEY = "token";

export const useLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createLocation = async (data: LocationRequest) => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error();

      const res = await fetch(`/Locations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        if (res.status === 401) {
          authService.logout();
          return;
        }
        throw new Error();
      }

      setSuccess(true);
      toast.success("Localização salva com sucesso!");
    } catch {
      toast.error("Erro ao salvar localização.");
      setError("Erro ao salvar localização.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const createWorkHours = async (data: WorkHoursRequest) => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error();

      const res = await fetch(`/WorksHours`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 401) {
          authService.logout();
          return;
        }
        throw new Error();
      }

      setSuccess(true);
      toast.success("Horário salvo com sucesso!");
    } catch {
      toast.error("Erro ao salvar horário.");
      setError("Erro ao salvar horário.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const getLocations = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error();

      const res = await fetch(`/Locations`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        authService.logout();
        throw new Error();
      }
      const data = await res.json();
      console.log(data);
      return data;
    } catch {
      toast.error("Erro ao buscar localizações.");
      setError("Erro ao buscar localizações.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getWorksHours = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error();

      const res = await fetch(`/WorksHours/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        authService.logout();
        throw new Error();
      }

      const data = await res.json();
      console.log(data);
      return data;
    } catch {
      toast.error("Erro ao buscar horários.");
      setError("Erro ao buscar horários.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const finishLocation = async (data: LocationRequest) => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error();

      const res = await fetch(`/Locations`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        if (res.status === 401) {
          authService.logout();
          return;
        }
        throw new Error();
      }
      toast.success("Localização finalizada com sucesso.");
      setSuccess(true);
    } catch {
      toast.error("Erro ao finalizar localização.");
      setError("Erro ao finalizar localização.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const deleteLocation = async (data: LocationRequest) => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error();

      const res = await fetch(`/Locations`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        if (res.status === 401) {
          authService.logout();
          return;
        }
        throw new Error();
      }
      toast.success("Localização finalizada com sucesso.");
      setSuccess(true);
    } catch {
      toast.error("Erro ao finalizar localização.");
      setError("Erro ao finalizar localização.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const deleteWorksHours = async (data: WorkHoursRequest) => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error();

      const res = await fetch(`/WorksHours`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        if (res.status === 401) {
          authService.logout();
          return;
        }
        throw new Error();
      }
      toast.success("Horários apagadas com sucesso.");
      setSuccess(true);
    } catch {
      toast.error("Erro ao apagar horários.");
      setError("Erro ao apagar horários.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    createLocation,
    getLocations,
    finishLocation,
    deleteLocation,
    createWorkHours,
    getWorksHours,
    deleteWorksHours,
    loading,
    error,
    success,
  };
};
