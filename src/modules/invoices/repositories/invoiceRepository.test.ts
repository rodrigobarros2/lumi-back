import { InvoicesDBRepository } from "./invoiceRepository";
import { AppError } from "../../../shared/errors/AppError";
import { InvoiceProps } from "../models/invoiceModel";

const mockPrisma = {
  invoice: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
};

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => mockPrisma),
  };
});

describe("InvoicesDBRepository", () => {
  let repository: InvoicesDBRepository;

  beforeEach(() => {
    repository = new InvoicesDBRepository();
    (repository as any).prisma = mockPrisma;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("deve criar uma fatura com sucesso", async () => {
    const invoice: InvoiceProps = {
      id: "1",
      installationNumber: 123456,
      distributor: "Distribuidor A",
      consumer: "Consumidor A",
      clientNumber: 98765,
      invoiceMonth: "2024-01",
      energyQuantity: 100,
      energyValue: 150.5,
      sceeeQuantity: 10,
      sceeeValue: 20.0,
      compensatedQuantity: 5,
      compensatedValue: 10.0,
      publicLighting: 15.0,
      invoiceUrl: null,
      invoiceName: null,
      createdAt: new Date(),
      updatedAt: null,
    };
    mockPrisma.invoice.create.mockResolvedValue(invoice);

    const result = await repository.create(invoice);

    expect(result).toEqual({ id: "1" });
    expect(mockPrisma.invoice.create).toHaveBeenCalledWith({ data: invoice });
  });

  test("deve lançar um erro ao falhar na criação de uma fatura", async () => {
    const invoice: InvoiceProps = {
      id: "1",
      installationNumber: 123456,
      distributor: "Distribuidor A",
      consumer: "Consumidor A",
      clientNumber: 98765,
      invoiceMonth: "2024-01",
      energyQuantity: 100,
      energyValue: 150.5,
      sceeeQuantity: 10,
      sceeeValue: 20.0,
      compensatedQuantity: 5,
      compensatedValue: 10.0,
      publicLighting: 15.0,
      invoiceUrl: null,
      invoiceName: null,
      createdAt: new Date(),
      updatedAt: null,
    };
    mockPrisma.invoice.create.mockRejectedValue(new Error("Error creating fatura"));

    await expect(repository.create(invoice)).rejects.toThrow(AppError);
    expect(mockPrisma.invoice.create).toHaveBeenCalledWith({ data: invoice });
  });

  test("deve buscar uma fatura por ID com sucesso", async () => {
    const fatura: InvoiceProps = {
      id: "1",
      installationNumber: 123456,
      distributor: "Distribuidor A",
      consumer: "Consumidor A",
      clientNumber: 98765,
      invoiceMonth: "2024-01",
      energyQuantity: 100,
      energyValue: 150.5,
      sceeeQuantity: 10,
      sceeeValue: 20.0,
      compensatedQuantity: 5,
      compensatedValue: 10.0,
      publicLighting: 15.0,
      invoiceUrl: null,
      invoiceName: null,
      createdAt: new Date(),
      updatedAt: null,
    };
    mockPrisma.invoice.findUnique.mockResolvedValue(fatura);

    const result = await repository.getById("1");

    expect(result).toEqual(fatura);
    expect(mockPrisma.invoice.findUnique).toHaveBeenCalledWith({ where: { id: "1" } });
  });

  test("deve buscar todas as faturas com sucesso", async () => {
    const faturas: InvoiceProps[] = [
      {
        id: "1",
        installationNumber: 123456,
        distributor: "Distribuidor A",
        consumer: "Consumidor A",
        clientNumber: 98765,
        invoiceMonth: "2024-01",
        energyQuantity: 100,
        energyValue: 150.5,
        sceeeQuantity: 10,
        sceeeValue: 20.0,
        compensatedQuantity: 5,
        compensatedValue: 10.0,
        publicLighting: 15.0,
        invoiceUrl: null,
        invoiceName: null,
        createdAt: new Date(),
        updatedAt: null,
      },
      {
        id: "2",
        installationNumber: 654321,
        distributor: "Distribuidor B",
        consumer: "Consumidor B",
        clientNumber: 54321,
        invoiceMonth: "2024-02",
        energyQuantity: 200,
        energyValue: 300.75,
        sceeeQuantity: 20,
        sceeeValue: 40.0,
        compensatedQuantity: 10,
        compensatedValue: 20.0,
        publicLighting: 30.0,
        invoiceUrl: null,
        invoiceName: null,
        createdAt: new Date(),
        updatedAt: null,
      },
    ];
    mockPrisma.invoice.findMany.mockResolvedValue(faturas);

    const result = await repository.getAll();

    expect(result).toEqual(faturas);
    expect(mockPrisma.invoice.findMany).toHaveBeenCalled();
  });
});
