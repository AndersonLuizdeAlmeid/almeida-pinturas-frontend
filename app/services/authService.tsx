import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://localhost:5300";

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/Authentications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error();

    const data = await response.json();

    await AsyncStorage.setItem("token", data.token);

    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem("token");
};

export const getToken = async () => {
  return await AsyncStorage.getItem("token");
};
