export interface InvoicesRepository {
  create(fatura: InvoiceProps): Promise<{ id: string }>;
  getByClientNumber(id: number): Promise<InvoiceProps[] | null>;
  getById(id: string): Promise<InvoiceProps | null>;
  getAll(): Promise<InvoiceProps[]>;
}

export interface InvoiceProps {
  id?: string;
  consumer: string;
  distributor: string;
  invoiceMonth: string;
  installationNumber: number;
  clientNumber: number;
  energyQuantity: number;
  energyValue: number;
  sceeeQuantity: number;
  sceeeValue: number;
  compensatedQuantity: number;
  compensatedValue: number;
  publicLighting: number;
  invoiceUrl: string | null;
  invoiceName: string | null;
  createdAt?: Date;
  updatedAt?: Date | null;
}
