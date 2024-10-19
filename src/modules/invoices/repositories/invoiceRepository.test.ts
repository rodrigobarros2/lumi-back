import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../shared/errors/AppError";
import { InvoiceProps } from "../models/invoiceModel";
import { InvoicesDBRepository } from "./invoiceRepository";

// Mock do PrismaClient
jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    invoice: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  })),
  Prisma: {
    Decimal: jest.fn().mockImplementation((value) => ({ toNumber: () => value })),
  },
}));

describe("InvoicesDBRepository", () => {
  let repository: InvoicesDBRepository;
  let mockPrisma: jest.Mocked<PrismaClient>;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new InvoicesDBRepository();
    mockPrisma = (repository as any).prisma;
  });

  describe("create", () => {
    it("deve criar uma fatura com sucesso", async () => {
      const mockInvoice = { id: "abc123" };
      (mockPrisma.invoice.create as jest.Mock).mockResolvedValue(mockInvoice);

      const result = await repository.create({} as InvoiceProps);

      expect(result).toEqual({ id: "abc123" });
      expect(mockPrisma.invoice.create).toHaveBeenCalled();
    });
  });

  describe("getByClientNumber", () => {
    it("deve retornar faturas para um número de cliente válido", async () => {
      const mockInvoices = [
        { id: "1", clientNumber: BigInt(123), energyValue: { toNumber: () => 100 } },
        { id: "2", clientNumber: BigInt(123), energyValue: { toNumber: () => 200 } },
      ];
      (mockPrisma.invoice.findMany as jest.Mock).mockResolvedValue(mockInvoices);

      const result = await repository.getByClientNumber(123);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("2");
    });

    it("deve lançar um AppError se ocorrer um erro", async () => {
      (mockPrisma.invoice.findMany as jest.Mock).mockRejectedValue(new Error("Erro de banco de dados"));

      await expect(repository.getByClientNumber(123)).rejects.toThrow(AppError);
    });
  });

  describe("getAll", () => {
    it("deve retornar todas as faturas", async () => {
      const mockInvoices = [
        { id: "1", clientNumber: BigInt(123), energyValue: { toNumber: () => 100 } },
        { id: "2", clientNumber: BigInt(456), energyValue: { toNumber: () => 200 } },
      ];
      (mockPrisma.invoice.findMany as jest.Mock).mockResolvedValue(mockInvoices);

      const result = await repository.getAll();

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("2");
    });
  });

  describe("getById", () => {
    it("deve retornar uma fatura para um ID válido", async () => {
      const mockInvoice = {
        id: "abc123",
        clientNumber: BigInt(123),
        energyValue: { toNumber: () => 100 },
      };
      (mockPrisma.invoice.findUnique as jest.Mock).mockResolvedValue(mockInvoice);

      const result = await repository.getById("abc123");

      expect(result).toBeDefined();
      expect(result?.id).toBe("abc123");
    });

    it("deve retornar null para um ID inválido", async () => {
      (mockPrisma.invoice.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.getById("invalid");

      expect(result).toBeNull();
    });

    it("deve lançar um AppError se ocorrer um erro", async () => {
      (mockPrisma.invoice.findUnique as jest.Mock).mockRejectedValue(new Error("Erro de banco de dados"));

      await expect(repository.getById("abc123")).rejects.toThrow(AppError);
    });
  });
});
