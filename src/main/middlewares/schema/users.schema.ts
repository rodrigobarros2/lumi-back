import { z } from "zod";

const preprocessNumber = (val: any) => {
  if (typeof val === "string") {
    const cleanValue = val.replace(/\./g, "").replace(",", ".");
    const num = Number(cleanValue);
    return isNaN(num) ? NaN : num;
  }
  return isNaN(val) ? NaN : Number(val);
};

export const CreateInvoicesSchema = z.object({
  body: z.object({
    consumer: z.string(),
    distributor: z.string(),
    invoiceMonth: z.string(),
    installationNumber: z.preprocess(
      preprocessNumber,
      z.number().refine((val) => !isNaN(val), {
        message: "installationNumber expected number, received NaN",
      })
    ),
    clientNumber: z.preprocess(
      preprocessNumber,
      z.number().refine((val) => !isNaN(val), {
        message: "clientNumber expected number, received NaN",
      })
    ),
    energyValue: z.preprocess(
      preprocessNumber,
      z.number().refine((val) => !isNaN(val), {
        message: "energyValue expected number, received NaN",
      })
    ),
    energyQuantity: z.preprocess(
      preprocessNumber,
      z.number().refine((val) => !isNaN(val), {
        message: "energyQuantity expected number, received NaN",
      })
    ),
    sceeeValue: z.preprocess(
      preprocessNumber,
      z.number().refine((val) => !isNaN(val), {
        message: "sceeeValue expected number, received NaN",
      })
    ),
    sceeeQuantity: z.preprocess(
      preprocessNumber,
      z.number().refine((val) => !isNaN(val), {
        message: "sceeeQuantity expected number, received NaN",
      })
    ),
    compensatedValue: z.preprocess(
      preprocessNumber,
      z.number().refine((val) => !isNaN(val), {
        message: "compensatedValue expected number, received NaN",
      })
    ),
    compensatedQuantity: z.preprocess(
      preprocessNumber,
      z.number().refine((val) => !isNaN(val), {
        message: "compensatedQuantity expected number, received NaN",
      })
    ),
    publicLighting: z.preprocess(
      preprocessNumber,
      z.number().refine((val) => !isNaN(val), {
        message: "publicLighting expected number, received NaN",
      })
    ),
    pdfFile: z.instanceof(File).optional(),
  }),
});
