import swaggerUI from "swagger-ui-express";
import { GuideEntity } from "../src/entities/GuideEntity";

const guide = {
  tag: ["Guides"],
  contentType: {
    "multipart/form-data": {
      schema: {
        $ref: "#components/schemas/guides",
      },
    },
  },
  schema: {
    type: "object",
    properties: {
      data: {
        type: "object",
        properties: {
          title: {
            type: "string",
            maxLength: 32,
            example: "Guia de acessibilidade",
          },
          content: {
            type: "string",
            example: "Este Guia fala sobre Acessibilidade",
          },
          deleted: {
            type: "boolean",
            default: "false",
          },
        },
      },
      file: {
        type: "string",
        format: "binary",
      },
    },
    required: ["data", "file"],
  },
};

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
    "/guides": {
      post: {
        summary: "Criação de Guia",
        description: "Essa rota será responsável por cadastrar um novo produto",
        tags: ["Guides"],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/guides",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Guia Criado com Sucesso",
            message: "Guia Criado com Sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/status200Guides",
                },
              },
            },
          },
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
        },
      },
    },
  },
  components: {
    schemas: {
      guides: {
        type: "object",
        properties: {
          data: {
            type: "object",
            properties: {
              title: {
                type: "string",
                maxLength: 32,
                example: "Guia de acessibilidade",
              },
              content: {
                type: "string",
                example: "Este Guia fala sobre Acessibilidade",
              },
              deleted: {
                type: "boolean",
                default: "false",
              },
            },
          },
          file: {
            type: "string",
            format: "binary",
          },
        },
        required: ["data", "file"],
      },
      status200Guides: {
        type: "object",
        properties: {
          data: {
            type: "string",
            description: "Requisição concluída com sucesso",
            example: {
              _id: "123456",
              title: "Título do guia",
              content: "Descrição do guia",
              author: "ID do autor",
              deleted: "Status do guia",
              filePaths: {
                filePath: "www.host.com/olaEmLiBras",
                publicId: "olaEmLibras",
              },
            },
          },
        },
      },
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
    },
  },
};
