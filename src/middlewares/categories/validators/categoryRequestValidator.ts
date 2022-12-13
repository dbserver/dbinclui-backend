import { body, param } from "express-validator";

export const categoryRequestValidator = (method: "post" | "put" | "get" | "delete") => {
  if (method === "post") {
    return [
      body("title")
        .notEmpty()
        .withMessage("O título da categoria não pode está vazio")
        .isLength({ min: 1, max: 32 })
        .withMessage("O título deve ter entre 1 a 32 caracteres")
        .isString()
        .withMessage("O formato deve ser uma string"),

      body("guide")
        .notEmpty()
        .withMessage("É necessário passar um guia para criar uma categoria")
        .isMongoId()
        .withMessage("Formato do ID inválido"),

      body("shortDescription")
        .notEmpty()
        .withMessage("A descrição da categoria não pode está vazia")
        .isString()
        .withMessage("O formato deve ser uma string"),
    ];
  }

  if (method === "put" || method === "get" || method === "delete") {
    return [
      body("title")
        .optional()
        .isLength({ min: 1, max: 32 })
        .withMessage("O título deve ter entre 1 a 32 caracteres")
        .isString()
        .withMessage("O formato deve ser uma string"),
      body("guide").optional().isMongoId().withMessage("Formato de ID inválido"),
      param("id")
        .notEmpty()
        .withMessage("Um ID da categoria é necessário para esse método")
        .isMongoId()
        .withMessage("Formato de ID inválido"),
    ];
  }

  return [];
};
