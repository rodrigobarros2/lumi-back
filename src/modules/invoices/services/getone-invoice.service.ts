import { InvoicesRepository } from "../models/invoiceModel";

export class GetOneInvoicesService {
  constructor(private readonly invoiceRepository: InvoicesRepository) {}

  public async perform(id: string) {
    return await this.invoiceRepository.getById(id);
  }
}
