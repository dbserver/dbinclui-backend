import { body, param } from "express-validator";

export const guideRequestValidator = (method: "post" | "put" | "get" | "delete") => {
  if (method === "post") {
    return [
      body("title")
        .notEmpty()
        .withMessage("O título do guia não pode está vazio")
        .isLength({ min: 1, max: 32 })
        .withMessage("O título deve ter entre 1 a 32 caracteres")
        .isString()
        .withMessage("O formato deve ser uma string"),

      body("content")
        .notEmpty()
        .withMessage("O conteúdo não pode está vazio")
        .isString()
        .withMessage("O formato deve ser uma string"),
    ];
  }

  if (method === "put" || method === "get" || method === "delete") {
    return [
      param("id")
        .notEmpty()
        .withMessage("Um ID do guia é necessário para esse método")
        .isMongoId()
        .withMessage("Formato de ID inválido"),

      body("title")
        .optional()
        .isLength({ min: 1, max: 32 })
        .withMessage("O título deve ter entre 1 a 32 caracteres")
        .isString()
        .withMessage("O formato deve ser uma string"),
    ];
  }

  return [];
};
