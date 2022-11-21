import { Response } from "express";

export const sucessfulResponse = (res: Response, data: any, status?: number) => {
  const statusCode = status ? status : 200;
  return res.status(statusCode).json(data);
};

export const clientErrorResponse = (res: Response, error: Error | any, status?: number) => {
  const statusCode = status ? status : 400;
  return res.status(statusCode).json({
    message: error instanceof Error ? error.message : error,
  });
};

export const serverErrorResponse = (res: Response, error: Error | any, status?: number) => {
  const statusCode = status ? status : 500;
  return res.status(statusCode).json({
    message: error instanceof Error ? error.message : error,
  });
};
