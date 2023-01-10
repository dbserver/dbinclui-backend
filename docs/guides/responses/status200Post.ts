export const status200Post = {
  description: "Guia Criado com Sucesso",
  message: "Guia Criado com Sucesso",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          data: {
            $ref: "#/components/schemas/guides/status200",
          },
        },
      },
    },
  },
};
