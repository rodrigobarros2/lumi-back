import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { HttpCode } from "../../shared/errors/AppError";

const validate = (schema: AnyZodObject) => async (request: Request, response: Response, next: NextFunction) => {
  try {
    const res = await schema.parseAsync({
      body: request.body,
      query: request.query,
      params: request.params,
    });
    Object.assign(request, res);

    return next();
  } catch (error) {
    return response.status(HttpCode.UNPROCESSABLE_ENTITY).json({
      response: "error",
      message: "A solicitação não pôde ser compreendida pelo servidor. Verifique a tipagem e parametros.",
      data: error,
    });
  }
};

export default validate;
