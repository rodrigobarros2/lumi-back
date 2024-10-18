import { InvoicesRepository } from "../models/invoiceModel";

export class GetAllInvoicesService {
  constructor(private readonly invoiceRepository: InvoicesRepository) {}

  public async perform() {
    return await this.invoiceRepository.getAll();
  }
}
