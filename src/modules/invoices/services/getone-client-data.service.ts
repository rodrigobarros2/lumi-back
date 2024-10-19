import { InvoicesRepository } from "../models/invoiceModel";

export class GetOneClientDataService {
  constructor(private readonly invoiceRepository: InvoicesRepository) {}

  public async perform(id: number) {
    return await this.invoiceRepository.getByClientNumber(id);
  }
}
