import { response } from "express";
import swaggerUI from "swagger-ui-express";

const responses = {
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
        tags: ["Guides"],
        summary: "Criação de Guia",
        description: "Essa rota será responsável por cadastrar um novo produto",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/guides/body",
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
                  type: "object",
                  properties: {
                    data: {
                      $ref: "#/components/schemas/guides/status200",
                    },
                  },
                },
              },
            },
          },
          ...responses
        },
      },
      get: {
        tags: ["Guides"],
        summary: "Requisição de guia",
        description: "Essa rota é responsável por requerer todos os guias do servidor",
        responses: {
          200: {
            description: "Guias da aplicação",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/guides/status200",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/guides/{id}": {
      get: {
        tags: ["Guides"],
        summary: "Buscar guia por ID",
        description: "Buscar um guia por um ID",
        parameters: [
          {
            type: "string",
            name: "id",
            in: "path",
            description: "ID do guia",
            required: true,
          },
        ],
        responses: {
          200: {
            description: "Guia encontrado com sucesso",
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
          },
          400: responses[400],
        },
      },
      put: {
        tags: ["Guides"],
        summary: "Edita um guia através do ID",
        description: "Essa rota edita um guia baseado no parâmetro passado",
        parameters: [
          {
            type: "string",
            name: "id",
            in: "path",
            description: "ID do guia",
            required: true,
          }
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/guides/body",
              },
            },
          },
        },
        responses:{
          200: {
            description: "Guia Editado com Sucesso",
            message: "Guia Editado com Sucesso",
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
          },
          ...responses
  
        }
      },
      delete:{
        tags:["Guides"],
        summary: "Deletar por ID",
        description: "Deleta uma guia baseado no ID passado como parametro",
        parameters: [
          {
            type: "string",
            name: "id",
            in: "path",
            description: "ID do guia",
            required: true,
          }
        ],
        responses:{
          200: {
            description: "Guia Deletado com Sucesso",
            message: "Guia Deletado  com Sucesso",
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
          },
          ...responses
        }
      }
      
    },
  },
  components: {
    schemas: {
      guides: {
        body: {
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
              },
            },
            file: {
              type: "string",
              format: "binary",
            },
          },
        },
        status200: {
          type: "object",
          description: "Requisição concluída com sucesso",
          example: {
            _id: "ID do guia",
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
