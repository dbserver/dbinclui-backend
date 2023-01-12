import { NextFunction, Request, Response } from "express";
import { clientErrorResponse } from "../../responses/appResponses.js";
import { FirebaseError } from "firebase-admin";
import { FirebaseApplication } from "../../database/Firebase.js";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.substring(7);

    if (!token) {
      return clientErrorResponse(res, new Error("Nenhum token foi passado, acesso negado."), 403);
    }

    const { auth } = new FirebaseApplication();

    const decoded = await auth.verifyIdToken(token);

    req.body.decoded = decoded;
    
    next();
  } catch (e) {
    const error = e as FirebaseError;

    if (error.code === "auth/argument-error") {
      return clientErrorResponse(res, new Error("Formato do token inválido, acesso negado."), 403);
    }

    if (error.code === "auth/id-token-expired") {
      return clientErrorResponse(res, new Error("Este token já foi expirado, acesso negado."), 403);
    }

    return clientErrorResponse(res, error);
  }
};
