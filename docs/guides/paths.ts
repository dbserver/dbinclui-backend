import { errorsResponses } from "../responses/errorsResponses.js";
import { status200Post } from "./responses/status200Post.js";

export const guidePaths = {
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
        200: status200Post,
        ...errorsResponses,
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
        400: errorsResponses[400],
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
        },
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
      responses: {
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
        ...errorsResponses,
      },
    },
    delete: {
      tags: ["Guides"],
      summary: "Deletar por ID",
      description: "Deleta uma guia baseado no ID passado como parametro",
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
        ...errorsResponses,
      },
    },
  },
  "/guides/delete/{id}": {
    patch: {
      tags: ["Guides"],
      summary: "Realiza o Delete Lógico pelo ID",
      description: "Essa rota deleta logicamente um guia baseado no parâmetro passado",
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
          description: "Guia Deletado Logicamente com Sucesso",
          message: "Guia Deletado Logicamente  com Sucesso",
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
        ...errorsResponses,
      },
    },
  },
};
