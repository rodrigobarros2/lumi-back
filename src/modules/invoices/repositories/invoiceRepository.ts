import { Prisma, PrismaClient } from "@prisma/client";
import { AppError, HttpCode } from "../../../shared/errors/AppError";
import { InvoiceProps, InvoicesRepository } from "../models/invoiceModel";
import prisma from "../../../database/prismaClient";

export class InvoicesDBRepository implements InvoicesRepository {
  private prisma = prisma;

  async create(fatura: InvoiceProps): Promise<{ id: string }> {
    const invoice = await this.prisma.invoice.create({
      data: {
        ...fatura,
        installationNumber: BigInt(fatura.installationNumber),
        clientNumber: BigInt(fatura.clientNumber),
        energyValue: new Prisma.Decimal(fatura.energyValue),
        energyQuantity: new Prisma.Decimal(fatura.energyQuantity),
        sceeeValue: new Prisma.Decimal(fatura.sceeeValue),
        sceeeQuantity: new Prisma.Decimal(fatura.sceeeQuantity),
        compensatedValue: new Prisma.Decimal(fatura.compensatedValue),
        compensatedQuantity: new Prisma.Decimal(fatura.compensatedQuantity),
        publicLighting: new Prisma.Decimal(fatura.publicLighting),
      },
    });
    return { id: invoice.id };
  }

  async getByClientNumber(clientNumber: number): Promise<InvoiceProps[]> {
    try {
      const invoices = await this.prisma.invoice.findMany({
        where: { clientNumber: BigInt(clientNumber) },
      });

      const convertedInvoices = invoices.map((invoice) => ({
        ...invoice,
        installationNumber: Number(invoice.installationNumber),
        clientNumber: Number(invoice.clientNumber),
        energyValue: invoice.energyValue.toNumber(),
        energyQuantity: invoice.energyQuantity.toNumber(),
        sceeeValue: invoice.sceeeValue.toNumber(),
        sceeeQuantity: invoice.sceeeQuantity.toNumber(),
        compensatedValue: invoice.compensatedValue.toNumber(),
        compensatedQuantity: invoice.compensatedQuantity.toNumber(),
        publicLighting: invoice.publicLighting.toNumber(),
      }));

      return convertedInvoices;
    } catch (error) {
      console.error("Prisma error:", error);
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Error fetching invoices by client number",
      });
    }
  }

  async getAll(): Promise<InvoiceProps[]> {
    const invoices = await this.prisma.invoice.findMany();
    return invoices.map((invoice) => ({
      ...invoice,
      installationNumber: Number(invoice.installationNumber),
      clientNumber: Number(invoice.clientNumber),
      energyValue: invoice.energyValue.toNumber(),
      energyQuantity: invoice.energyQuantity.toNumber(),
      sceeeValue: invoice.sceeeValue.toNumber(),
      sceeeQuantity: invoice.sceeeQuantity.toNumber(),
      compensatedValue: invoice.compensatedValue.toNumber(),
      compensatedQuantity: invoice.compensatedQuantity.toNumber(),
      publicLighting: invoice.publicLighting.toNumber(),
    }));
  }

  async getById(id: string): Promise<InvoiceProps | null> {
    try {
      const invoice = await this.prisma.invoice.findUnique({
        where: { id: id },
      });

      if (!invoice) {
        return null;
      }

      const convertedInvoice: InvoiceProps = {
        ...invoice,
        installationNumber: Number(invoice.installationNumber),
        clientNumber: Number(invoice.clientNumber),
        energyValue: invoice.energyValue.toNumber(),
        energyQuantity: invoice.energyQuantity.toNumber(),
        sceeeValue: invoice.sceeeValue.toNumber(),
        sceeeQuantity: invoice.sceeeQuantity.toNumber(),
        compensatedValue: invoice.compensatedValue.toNumber(),
        compensatedQuantity: invoice.compensatedQuantity.toNumber(),
        publicLighting: invoice.publicLighting.toNumber(),
      };

      return convertedInvoice;
    } catch (error) {
      console.error("Prisma error:", error);
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Error fetching invoice by ID",
      });
    }
  }
}
