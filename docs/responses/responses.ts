import { guideSchema } from "../guides/guideSchema.js";

const errorsSchema = {
  status400: {
    type: "object",
    properties: {
      message: {
        type: "string",
        description: "Falha na requisição",
        example: "Dados incompleto ou inválido",
      },
    },
  },
  status401: {
    type: "object",
    properties: {
      message: {
        type: "string",
        description: "Unauthorized",
        example: "Você precisa estar logado",
      },
    },
  },
  status403: {
    type: "object",
    properties: {
      message: {
        type: "string",
        description: "Forbidden",
        example: "Você não tem privilégios suficiente para executar esta ação",
      },
    },
  },
};

export const responses = {
  200: {
    guide: {
      description: "Ação realizada com Sucesso",
      message: "Ação realizada com Sucesso",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: guideSchema.dataResponse,
            },
          },
        },
      },
    },
  },
  400: {
    description: "Dados requeridos não encontrados no corpo da requisição",
    content: {
      "application/json": {
        schema: errorsSchema.status400,
      },
    },
  },
  401: {
    description: "Unauthorized, você precisa estar logado",
    content: {
      "application/json": {
        schema: errorsSchema.status401,
      },
    },
  },
  403: {
    description: "Forbidden, você não tem privilégios suficientes para executar esta ação",
    content: {
      "application/json": {
        schema: errorsSchema.status403,
      },
    },
  },
};
