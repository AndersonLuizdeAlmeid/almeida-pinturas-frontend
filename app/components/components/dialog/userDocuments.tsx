import { useEffect, useState } from "react";
import { Button } from "@/app/components/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/components/ui/table";
import { useUserDocuments } from "@/hooks/useUserDocuments";
import { Loader2, Trash2, Plus, Eye } from "lucide-react";
import { DocumentFile, DocumentShow } from "@/types/Document";
import UserDocumentsDialog from "./userDocumentsDialog";
import { formatDateForInput } from "@/utils/dateUtils";
import { openFile } from "@/utils/openFile";

interface UserDocumentsProps {
  userId: number | null;
}

export default function UserDocuments({ userId }: UserDocumentsProps) {
  const { documents, loading, fetchDocuments, deleteDocument, addDocument } =
    useUserDocuments(userId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSaveChangesUser = async (document: DocumentFile) => {
    await addDocument(document);
    setIsDialogOpen(false);
    await fetchDocuments();
  };

  const handleView = (doc: DocumentShow) => {
    openFile(doc.content);
  };

  useEffect(() => {
    if (userId) {
      fetchDocuments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  if (!userId) return null;

  return (
    <Card className="w-full mt-4 p-4 bg-white rounded-xl shadow-lg">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Documentos do Funcionário</CardTitle>
        <div className="flex space-x-4 ">
          <Button
            onClick={() => {
              setIsDialogOpen(true);
            }}
            className="cursor-pointer hover:bg-gray-900 transition duration-200"
          >
            {loading ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
            Adicionar Documento
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead> Nome do Documento</TableHead>
                <TableHead> Data de Vencimento </TableHead>
                <TableHead> Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.length > 0 ? (
                documents.map((doc) => (
                  <TableRow
                    key={doc.id}
                    className={
                      doc.type === 0
                        ? "bg-background"
                        : doc.type === 1
                        ? "bg-red-500"
                        : doc.type === 2
                        ? "bg-yellow-500"
                        : ""
                    }
                  >
                    <TableCell>{doc.fileName}</TableCell>
                    <TableCell>
                      {formatDateForInput(doc.expirationDate)}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="ghost"
                        className="w-10 h-10 p-2"
                        onClick={() => handleView(doc)} // <- passa o doc aqui
                      >
                        <Eye className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="secondary"
                        className="w-10 h-10 p-2 bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => deleteDocument(doc.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center text-gray-500">
                    Nenhum documento encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <UserDocumentsDialog
        onSave={handleSaveChangesUser}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </Card>
  );
}
