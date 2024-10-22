import { PrismaClient, Prisma } from "@prisma/client";
import { InvoiceProps } from "../models/invoiceModel";
import { InvoicesDBRepository } from "./invoiceRepository";
import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("@prisma/client", () => {
  const Decimal = vi.fn().mockImplementation((value) => ({
    toNumber: () => Number(value),
  }));

  return {
    PrismaClient: vi.fn().mockImplementation(() => ({
      invoice: {
        create: vi.fn(),
        findMany: vi.fn(),
        findUnique: vi.fn(),
      },
    })),
    Prisma: {
      Decimal,
    },
  };
});

describe("InvoicesDBRepository", () => {
  let repository: InvoicesDBRepository;
  let mockPrisma: any;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new InvoicesDBRepository();
    mockPrisma = (repository as any).prisma;
  });

  describe("create", () => {
    it("deve criar uma nova fatura", async () => {
      const mockInvoice: InvoiceProps = {
        id: "1",
        clientNumber: 123,
        energyValue: 100,
        consumer: "Consumer 1",
        distributor: "Distributor 1",
        invoiceMonth: new Date().toISOString(),
        installationNumber: 123456,
        energyQuantity: 50,
        sceeeQuantity: 10,
        sceeeValue: 5,
        compensatedQuantity: 20,
        compensatedValue: 10,
        publicLighting: 2,
        invoiceUrl: null,
        invoiceName: null,
        createdAt: new Date(),
        updatedAt: null,
      };

      mockPrisma.invoice.create.mockResolvedValue({ id: "1" });

      const result = await repository.create(mockInvoice);

      expect(result).toEqual({ id: "1" });

      expect(mockPrisma.invoice.create).toHaveBeenCalledWith({
        data: {
          ...mockInvoice,
          installationNumber: BigInt(mockInvoice.installationNumber),
          clientNumber: BigInt(mockInvoice.clientNumber),
          energyValue: expect.objectContaining({ toNumber: expect.any(Function) }),
          energyQuantity: expect.objectContaining({ toNumber: expect.any(Function) }),
          sceeeValue: expect.objectContaining({ toNumber: expect.any(Function) }),
          sceeeQuantity: expect.objectContaining({ toNumber: expect.any(Function) }),
          compensatedValue: expect.objectContaining({ toNumber: expect.any(Function) }),
          compensatedQuantity: expect.objectContaining({ toNumber: expect.any(Function) }),
          publicLighting: expect.objectContaining({ toNumber: expect.any(Function) }),
        },
      });
    });
  });

  describe("getByClientNumber", () => {
    it("deve retornar faturas pelo número do cliente", async () => {
      const mockInvoices: InvoiceProps[] = [
        {
          id: "1",
          clientNumber: 123,
          energyValue: 100,
          consumer: "Consumer 1",
          distributor: "Distributor 1",
          invoiceMonth: new Date().toISOString(),
          installationNumber: 123456,
          energyQuantity: 50,
          sceeeQuantity: 10,
          sceeeValue: 5,
          compensatedQuantity: 20,
          compensatedValue: 10,
          publicLighting: 2,
          invoiceUrl: null,
          invoiceName: null,
          createdAt: new Date(),
          updatedAt: null,
        },
      ];
      mockPrisma.invoice.findMany.mockResolvedValue(mockInvoices);

      const result = await repository.getByClientNumber(123);

      expect(result).toEqual(mockInvoices);
      expect(mockPrisma.invoice.findMany).toHaveBeenCalledWith({
        where: { clientNumber: BigInt(123) },
      });
    });
  });

  describe("getById", () => {
    it("deve retornar uma fatura pelo ID", async () => {
      const mockInvoice: InvoiceProps = {
        id: "1",
        clientNumber: 123,
        energyValue: 100,
        consumer: "Consumer 1",
        distributor: "Distributor 1",
        invoiceMonth: new Date().toISOString(),
        installationNumber: 123456,
        energyQuantity: 50,
        sceeeQuantity: 10,
        sceeeValue: 5,
        compensatedQuantity: 20,
        compensatedValue: 10,
        publicLighting: 2,
        invoiceUrl: null,
        invoiceName: null,
        createdAt: new Date(),
        updatedAt: null,
      };
      mockPrisma.invoice.findUnique.mockResolvedValue(mockInvoice);

      const result = await repository.getById("1");
      expect(result).toEqual(mockInvoice);

      expect(mockPrisma.invoice.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
      });
    });

    it("deve retornar null se a fatura não for encontrada", async () => {
      mockPrisma.invoice.findUnique.mockResolvedValue(null);

      const result = await repository.getById("1");

      expect(result).toBeNull();
      expect(mockPrisma.invoice.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
      });
    });

    describe("getAll", () => {
      it("deve retornar todas as faturas", async () => {
        const mockInvoices: InvoiceProps[] = [
          {
            id: "1",
            clientNumber: 123,
            energyValue: 100,
            consumer: "Consumer 1",
            distributor: "Distributor 1",
            invoiceMonth: new Date().toISOString(),
            installationNumber: 123456,
            energyQuantity: 50,
            sceeeQuantity: 10,
            sceeeValue: 5,
            compensatedQuantity: 20,
            compensatedValue: 10,
            publicLighting: 2,
            invoiceUrl: null,
            invoiceName: null,
            createdAt: new Date(),
            updatedAt: null,
          },
          {
            id: "2",
            clientNumber: 456,
            energyValue: 200,
            consumer: "Consumer 2",
            distributor: "Distributor 2",
            invoiceMonth: new Date().toISOString(),
            installationNumber: 654321,
            energyQuantity: 100,
            sceeeQuantity: 20,
            sceeeValue: 10,
            compensatedQuantity: 40,
            compensatedValue: 20,
            publicLighting: 4,
            invoiceUrl: null,
            invoiceName: null,
            createdAt: new Date(),
            updatedAt: null,
          },
        ];
        mockPrisma.invoice.findMany.mockResolvedValue(mockInvoices);

        const result = await repository.getAll();

        expect(result).toEqual(mockInvoices);
        expect(mockPrisma.invoice.findMany).toHaveBeenCalled();
      });
    });
  });
});
