export interface InvoicesRepository {
  create(fatura: InvoiceProps): Promise<{ id: string }>;
  getById(id: string): Promise<InvoiceProps | null>;
  getAll(): Promise<InvoiceProps[]>;
}

export interface InvoiceProps {
  id?: string;
  installationNumber: number;
  distributor: string;
  consumer: string;
  clientNumber: number;
  invoiceMonth: string;
  energyQuantity: number;
  energyValue: number;
  sceeeQuantity: number;
  sceeeValue: number;
  compensatedQuantity: number;
  compensatedValue: number;
  publicLighting: number;
  invoiceUrl: string | null;
  invoiceName: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}
