import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import pinoHttp from "pino-http";
import { logger } from "../../shared/errors/logger";

export const setupApp = () => {
  const app: Application = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cors());

  app.use(helmet());

  app.use(pinoHttp({ logger }));

  app.use("/api", routes);

  app.get("/", (request: Request, response: Response) => {
    response.json({
      response: "successfull",
      message: "Hello World 🌍",
      data: {},
    });
  });

  app.use((_: Request, response: Response) => {
    response.status(404).json({
      response: "error",
      message: "Not Found. Ohh you are lost, read the API documentation to find your way back home 😂",
      data: {},
    });
  });

  return app;
};

