import { Response } from "express";
import { InvoicesRepository } from "../models/invoiceModel";
import { HttpCode } from "../../../shared/errors/AppError";

export class GetPdfService {
  constructor(private readonly invoiceRepository: InvoicesRepository) {}

  public async perform(id: string, response: Response) {
    const invoice = await this.invoiceRepository.getById(id);

    try {
      if (!invoice || !invoice.invoiceUrl) {
        return response.status(HttpCode.NOT_FOUND).json({
          response: "error",
          message: "PDF não encontrado",
        });
      }

      response.download(invoice.invoiceUrl, invoice.invoiceName ?? "fatura.pdf", (err) => {
        if (err) {
          console.error("Erro ao fazer o download do arquivo:", err);
          if (!response.headersSent) {
            response.status(HttpCode.INTERNAL_SERVER_ERROR).json({
              response: "error",
              message: "Erro ao fazer download do PDF",
            });
          }
        }
      });
    } catch (error) {
      console.error("Erro ao consultar o banco de dados:", error);
      if (!response.headersSent) {
        response.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          response: "error",
          message: "Erro ao consultar o banco de dados.",
        });
      }
    }
  }
}
