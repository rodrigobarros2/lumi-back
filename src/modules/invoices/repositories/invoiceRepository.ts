import { PrismaClient } from "@prisma/client";
import { AppError, HttpCode } from "../../../shared/errors/AppError";
import { InvoiceProps, InvoicesRepository } from "../models/invoiceModel";

export class InvoicesDBRepository implements InvoicesRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(fatura: InvoiceProps): Promise<{ id: string }> {
    try {
      const createdInvoice = await this.prisma.invoice.create({ data: fatura });
      return { id: createdInvoice.id };
    } catch (error) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Error creating fatura",
      });
    }
  }

  async getById(id: string): Promise<InvoiceProps | null> {
    try {
      return await this.prisma.invoice.findUnique({ where: { id } });
    } catch (error) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Error fetching fatura by ID",
      });
    }
  }

  async getAll(): Promise<InvoiceProps[]> {
    try {
      return await this.prisma.invoice.findMany();
    } catch (error) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Error fetching all faturas",
      });
    }
  }
}
