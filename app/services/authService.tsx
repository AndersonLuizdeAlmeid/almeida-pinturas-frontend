import AsyncStorage from "@react-native-async-storage/async-storage";
import { redirect } from "next/navigation";

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`/Authentications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error();

    const data = await response.json();

    await AsyncStorage.setItem("token", data.token);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem("token");
  redirect("/login");
};

export const getToken = async () => {
  return await AsyncStorage.getItem("token");
};
