import { PrismaClient, Prisma } from "@prisma/client";
import { InvoiceProps } from "../models/invoiceModel";
import { InvoicesDBRepository } from "./invoiceRepository";
import { AppError } from "../../../shared/errors/AppError";

jest.mock("@prisma/client", () => {
  const Decimal = jest.fn().mockImplementation((value) => ({
    toNumber: () => Number(value),
  }));

  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      invoice: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
      },
    })),
    Prisma: {
      Decimal,
    },
  };
});

describe("InvoicesDBRepository", () => {
  let repository: InvoicesDBRepository;
  let mockPrisma: jest.Mocked<PrismaClient>;

  beforeEach(() => {
    jest.clearAllMocks();
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

      (mockPrisma.invoice.create as jest.Mock).mockResolvedValue({ id: "1" });

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
      (mockPrisma.invoice.findMany as jest.Mock).mockResolvedValue(mockInvoices);

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
      (mockPrisma.invoice.findUnique as jest.Mock).mockResolvedValue(mockInvoice);

      const result = await repository.getById("1");

      expect(result).toEqual({
        ...mockInvoice,
        installationNumber: Number(mockInvoice.installationNumber),
        clientNumber: Number(mockInvoice.clientNumber),
        energyValue: Number(mockInvoice.energyValue),
        energyQuantity: Number(mockInvoice.energyQuantity),
        sceeeValue: Number(mockInvoice.sceeeValue),
        sceeeQuantity: Number(mockInvoice.sceeeQuantity),
        compensatedValue: Number(mockInvoice.compensatedValue),
        compensatedQuantity: Number(mockInvoice.compensatedQuantity),
        publicLighting: Number(mockInvoice.publicLighting),
      });
      expect(mockPrisma.invoice.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
      });
    });

    it("deve retornar null se a fatura não for encontrada", async () => {
      (mockPrisma.invoice.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.getById("1");

      expect(result).toBeNull();
      expect(mockPrisma.invoice.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
      });
    });
  });
});
