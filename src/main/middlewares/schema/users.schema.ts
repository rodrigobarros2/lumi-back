import { z } from "zod";

export const CreateInvoicesSchema = z.object({
  body: z.object({
    consumer: z.string(),
    distributor: z.string(),
    invoiceMonth: z.string(),
    installationNumber: z.preprocess((val) => Number(val), z.number()),
    clientNumber: z.preprocess((val) => Number(val), z.number()),
    energyValue: z.preprocess((val) => Number(val), z.number()),
    energyQuantity: z.preprocess((val) => Number(val), z.number()),
    sceeeValue: z.preprocess((val) => Number(val), z.number()),
    sceeeQuantity: z.preprocess((val) => Number(val), z.number()),
    compensatedValue: z.preprocess((val) => Number(val), z.number()),
    compensatedQuantity: z.preprocess((val) => Number(val), z.number()),
    publicLighting: z.preprocess((val) => Number(val), z.number()),
    pdfFile: z.instanceof(File).optional(),
  }),
});
