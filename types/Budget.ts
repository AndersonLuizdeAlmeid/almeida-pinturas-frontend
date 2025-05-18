export interface BudgetView {
  id: string;
  clientName: string;
  clientCnpj: string;
  clientAddress: string;
  clientPhone: string;
  description: string;
  documentDate: Date;
  items: Item[];
}

export interface Budget {
  id: string;
  name: string;
  dateCreated: Date;
  content: File;
}

export interface Item {
  name: string;
  price: number;
}

export interface BudgetShow {
  id: string;
  name: string;
  dateCreated: Date;
  content: string;
}
