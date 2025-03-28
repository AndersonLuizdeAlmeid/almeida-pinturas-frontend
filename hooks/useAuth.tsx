import { useState, useEffect } from "react";
import { getToken, login, logout } from "@/app/services/authService";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await getToken();
      setToken(storedToken);
      setLoading(false);
    };
    checkToken();
  }, []);

  const signIn = async (email: string, password: string) => {
    const data = await login(email, password);
    setToken(data.token);
  };

  const signOut = async () => {
    await logout();
    setToken(null);
  };

  return { token, loading, signIn, signOut };
};
