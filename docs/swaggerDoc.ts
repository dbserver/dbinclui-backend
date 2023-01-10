import swaggerUI from "swagger-ui-express";
import { guidePaths } from "./guides/paths.js";
import { guideSchema } from "./guides/schema.js";

export const swaggerConfig: swaggerUI.JsonObject = {
  openapi: "3.0.3",
  info: {
    title: "DBInclui",
    description:
      "O web app é destinado para todas as pessoas que desejam aprender LIBRAS e entender um pouco mais sobre Inclusão de PCD's na sociedade. O web app aproveita o Guia de Acessibilidade e a Apostila de Libras como fonte para informação de inclusão, assim como, utiliza a API VLIBRAS para as funcionalidades específicas.",
    termsOfService: "http://localgost:3001/terms",
    contact: {
      email: "info@dbserver.com.br",
    },
    version: "1.0.0",
  },
  paths: {
    ...guidePaths,
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      guides: guideSchema,
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
    },
  },
};
