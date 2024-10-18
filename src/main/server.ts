import { createHttpTerminator } from "http-terminator";
import { setupApp } from "./config/app";
import env from "./config/env";
import { logger } from "../shared/errors/logger";

export const app = setupApp();

export const server = app.listen(env.port, () => {
  logger.info(`Server running at: http://localhost:${env.port}`);
});

export const httpTerminator = createHttpTerminator({
  server,
});
