import { AppError, HttpCode } from "../../../shared/errors/AppError";
import { InvoiceProps, InvoicesRepository } from "../models/invoiceModel";

export class CreateInvoicesService {
  constructor(private readonly invoiceRepository: InvoicesRepository) {}

  public async perform(invoice: InvoiceProps, file?: Express.Multer.File): Promise<{ id: string }> {
    try {
      const newInvoice: InvoiceProps = {
        ...invoice,
        invoiceUrl: file?.path ?? null,
        invoiceName: file?.originalname ?? null,
      };

      return await this.invoiceRepository.create(newInvoice);
    } catch (error) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Não foi possível criar a fatura corretamente.",
      });
    }
  }
}
