import { body, param } from "express-validator";

export const digitalContentRequestValidator = (method: "post" | "put" | "get" | "delete") => {
  if (method === "post") {
    return [
      body("title")
        .notEmpty()
        .withMessage("O título do guia não pode está vazio")
        .isLength({ min: 1, max: 32 })
        .withMessage("O título deve ter entre 1 a 32 caracteres")
        .isString()
        .withMessage("O formato deve ser uma string"),

      body("shortDescription")
        .notEmpty()
        .withMessage("A descrição do conteúdo não pode está vazio")
        .isString()
        .withMessage("O formato deve ser uma string"),

      body("guide")
        .notEmpty()
        .withMessage("O ID do guia não pode está vazio")
        .isMongoId()
        .withMessage("Formado do ID inválido"),

      body("category")
        .notEmpty()
        .withMessage("O ID da categoria não pode está vazio")
        .isMongoId()
        .withMessage("Formado do ID inválido"),
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
      body("guide").optional().isMongoId().withMessage("Formato do ID do guia inválido"),
      body("category").optional().isMongoId().withMessage("Formato do ID da categoria inválido"),
      param("id")
        .notEmpty()
        .withMessage("ID do conteúdo digital é necessário para esse método")
        .isMongoId()
        .withMessage("Formato do ID do conteúdo inválido"),
    ];
  }

  return [];
};
