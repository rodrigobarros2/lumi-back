import { Router } from "express";

import usersRoutes from "../routes/invoices.routes";

const router = Router();

router.use("/invoices", usersRoutes);

export default router;
