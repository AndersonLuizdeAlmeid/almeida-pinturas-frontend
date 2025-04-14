export interface Document {
  id: string;
  folderId: string;
  fileName: string;
  fileType: string;
  size: number;
  uploadDate: Date;
  content: File;
}

export interface DocumentFile {
  file: File;
  expirationDate?: string;
}

export interface DocumentShow {
  id: string;
  fileName: string;
  fileType: string;
  content: string;
  type: number;
  expirationDate?: string;
}
