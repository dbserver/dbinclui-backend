import swaggerUI from "swagger-ui-express";
import { guidePaths } from "./guides/guidesPaths.js";
import { categoriesPaths } from "./categories/categoriesPaths.js";

export const swaggerConfig: swaggerUI.JsonObject = {
  openapi: "3.0.3",
  info: {
    title: "DBInclui",
    description:
      "O web app é destinado para todas as pessoas que desejam aprender LIBRAS e entender um pouco mais sobre Inclusão de PCD's na sociedade. O web app aproveita o Guia de Acessibilidade e a Apostila de Libras como fonte para informação de inclusão, assim como, utiliza a API VLIBRAS para as funcionalidades específicas.",
    contact: {
      email: "info@dbserver.com.br",
    },
    version: "1.0.0",
  },
  paths: {
    ...guidePaths,
    ...categoriesPaths,
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
    schemas: {},
  },
};
