import { User } from "@/types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.REACT_APP_API_URL;
const TOKEN_KEY = "token";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error();

      const response = await fetch(`${API_URL}/Users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error();

      const data = await response.json();
      setUsers(data);
    } catch {
      toast.error("Email ou senha incorretos!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, fetchUsers };
};
