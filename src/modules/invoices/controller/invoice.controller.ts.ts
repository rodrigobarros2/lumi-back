import { Request, Response } from "express";
import { HttpCode } from "../../../shared/errors/AppError";
import { InvoicesDBRepository } from "../repositories/invoiceRepository";
import { GetAllInvoicesService } from "../services/getall-invoice.service";
import { CreateInvoicesService } from "../services/create-invoice.service";
import { GetOneInvoicesService } from "../services/getone-invoice.service";
import { GetPdfService } from "../services/getPdf-invoice.service";
import { GetOneClientDataService } from "../services/getone-client-data.service";

class InvoicesController {
  static async create(request: Request, response: Response) {
    const invoiceService = new CreateInvoicesService(new InvoicesDBRepository());

    const invoice = request.body;
    const filePdf = request.file;

    const result = await invoiceService.perform(invoice, filePdf);

    response.status(HttpCode.OK).json({
      response: "successfull",
      message: result.statusCode === 201 ? "Fatura cadastrada com sucesso" : "Fatura atualizada com sucesso",
      data: result ?? {},
    });
  }

  static async getAll(request: Request, response: Response) {
    const invoiceService = new GetAllInvoicesService(new InvoicesDBRepository());

    const result = await invoiceService.perform();

    response.status(HttpCode.OK).json({
      response: "successfull",
      message: "Dados obtidos com sucesso",
      data: result,
    });
  }

  static async getById(request: Request, response: Response) {
    const invoiceService = new GetOneInvoicesService(new InvoicesDBRepository());

    const result = await invoiceService.perform(request.params.id);

    response.status(HttpCode.OK).json({
      response: "successfull",
      message: "Dados obtidos com sucesso",
      data: result ?? {},
    });
  }

  static async getByClientNumber(request: Request, response: Response) {
    const invoiceService = new GetOneClientDataService(new InvoicesDBRepository());

    const result = await invoiceService.perform(Number(request.params.id));

    response.status(HttpCode.OK).json({
      response: "successfull",
      message: "Dados obtidos com sucesso",
      data: result ?? {},
    });
  }

  static async getPdf(request: Request, response: Response) {
    const invoiceService = new GetPdfService(new InvoicesDBRepository());
    await invoiceService.perform(request.params.id, response);
  }
}

export default InvoicesController;
