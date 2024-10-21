import { AppError, HttpCode } from "../../../shared/errors/AppError";
import { InvoiceProps, InvoicesRepository } from "../models/invoiceModel";

export class CreateInvoicesService {
  constructor(private readonly invoiceRepository: InvoicesRepository) {}

  public async perform(invoice: InvoiceProps, file?: Express.Multer.File): Promise<{ id: string }> {
    try {
      const existingInvoices = await this.invoiceRepository.getByClientNumber(invoice.clientNumber);
      const existingInvoice = existingInvoices?.find(
        (existingInvoice) => existingInvoice.invoiceMonth === invoice.invoiceMonth
      );

      const newInvoice: InvoiceProps = {
        ...invoice,
        invoiceUrl: file?.path ?? null,
        invoiceName: file?.originalname ?? null,
      };

      // se uma fatura pra esse mês já existir, atualiza ela
      if (existingInvoice) {
        if (existingInvoice.id) {
          await this.invoiceRepository.update(existingInvoice.id, newInvoice);
        } else {
          throw new AppError({
            httpCode: HttpCode.BAD_REQUEST,
            description: "ID da fatura existente não encontrado.",
          });
        }
        return { id: existingInvoice.id };
      }

      return await this.invoiceRepository.create(newInvoice);
    } catch (error) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Não foi possível criar a fatura corretamente.",
      });
    }
  }
}
