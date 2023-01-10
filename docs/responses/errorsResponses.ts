export const errorsResponses = {
  400: {
    description: "Dados requeridos não encontrados no corpo da requisição",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/status400",
        },
      },
    },
  },
  401: {
    description: "Unauthorized, você precisa estar logado",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/status401",
        },
      },
    },
  },
  403: {
    description: "Forbidden, você não tem privilégios suficientes para executar esta ação",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/status403",
        },
      },
    },
  },
};
