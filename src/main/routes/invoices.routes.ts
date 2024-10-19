import { Router } from "express";
import multer from "multer";
import validate from "../middlewares/validate.middleware";
import { CreateInvoicesSchema } from "../middlewares/schema/users.schema";
import InvoicesController from "../../modules/invoices/controller/invoice.controller.ts";

const upload = multer({ dest: "uploads/" });
const router = Router();

router.route("/").post(upload.single("pdfFile"), validate(CreateInvoicesSchema), InvoicesController.create);
router.route("/").get(InvoicesController.getAll);
router.route("/:id").get(InvoicesController.getById);
router.route("/:id/pdf").get(InvoicesController.getPdf);
router.route("/:id/client").get(InvoicesController.getByClientNumber);
export default router;
