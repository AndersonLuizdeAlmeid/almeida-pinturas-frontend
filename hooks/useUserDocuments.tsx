import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { toast } from "sonner";
import { DocumentFile, DocumentShow } from "@/types/Document";

const API_URL = "http://45.10.154.254:5000";
const TOKEN_KEY = "token";

export const useUserDocuments = (userId: number | null) => {
  const [documents, setDocuments] = useState<DocumentShow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchDocuments();
    }
  }, [userId]);

  const fetchDocuments = async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error("Token não encontrado");

      const response = await fetch(`${API_URL}/Documents/userId/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar documentos");
      }

      const data = await response.json();
      setDocuments(data);
    } catch (err) {
      toast.error("Erro ao buscar documentos do usuário.");
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const addDocument = async (document: DocumentFile) => {
    if (!userId) return;
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error("Token não encontrado");

      const formData = new FormData();
      formData.append("file", document.file);

      const response = await fetch(
        `${API_URL}/Documents/user/${userId}/${document.expirationDate}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao fazer upload do documento aaa");
      }

      toast.success("Documento enviado com sucesso");
    } catch (err) {
      toast.error("Erro ao fazer upload do documento");
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (documentId: string) => {
    try {
      console.log(documentId);
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error("Token não encontrado");

      const response = await fetch(`${API_URL}/Documents/${documentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir documento");
      }

      toast.success("Documento excluído com sucesso!");
      setDocuments((prev) => prev.filter((doc) => doc.id !== documentId));
    } catch (err) {
      toast.error("Erro ao excluir documento.");
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    }
  };

  return {
    documents,
    loading,
    error,
    fetchDocuments,
    addDocument,
    deleteDocument,
  };
};
