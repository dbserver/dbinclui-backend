import { responses } from "../responses/responses.js";
import { guideSchema } from "./guideSchema.js";

export const guidePaths = {
  "/guides": {
    post: {
      tags: ["Guides"],
      summary: "Criação de Guia",
      description: "Essa rota será responsável por cadastrar um novo produto",
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: guideSchema.content,
          },
        },
      },
      responses: {
        200: responses[200].guide,
        400: responses[400],
        401: responses[401],
        403: responses[403],
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
                    items: guideSchema.dataResponse,
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
        200: responses[200].guide,
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
        },
      ],
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: guideSchema.content,
          },
        },
      },
      responses: {
        200: responses[200].guide,
        400: responses[400],
        401: responses[401],
        403: responses[403],
      },
    },
    delete: {
      tags: ["Guides"],
      summary: "Deletar por ID",
      description: "Deleta uma guia baseado no ID passado como parâmetro",
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
        200: responses[200].guide,
        400: responses[400],
        401: responses[401],
        403: responses[403],
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
        200: responses[200].guide,
        400: responses[400],
        401: responses[401],
        403: responses[403],
      },
    },
  },
};
