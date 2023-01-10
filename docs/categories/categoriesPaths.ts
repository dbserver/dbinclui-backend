import { responses } from "../responses/responses.js";
import { categoriesSchemas } from "./categoriesSchemas.js";

export const categoriesPaths = {
  "/categories": {
    post: {
      tags: ["Categories"],
      summary: "Criação de categoria",
      description: "Rota para criar uma categoria",
      requestBody: {
        content: {
          "application/json": {
            schema: categoriesSchemas.content,
          },
        },
      },
      responses: {
        200: responses[200].category,
        400: responses[400],
        401: responses[401],
        403: responses[403],
      },
    },
    get: {
      tags: ["Categories"],
      summary: "Retorna todas as categorias",
      description: "Rota para retornar todas as categorias",
      responses: {
        200: {
          description: "Categorias da aplicação",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: categoriesSchemas.dataResponse,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/categories/{id}": {
    get: {
      tags: ["Categories"],
      summary: "Retorna uma categoria por ID",
      description: "Rota para retornar uma categoria por ID",
      parameters: [
        {
          type: "string",
          name: "id",
          in: "path",
          description: "ID da categoria",
          required: true,
        },
      ],
      responses: {
        200: responses[200].category,
        400: responses[400],
      },
    },
    put: {
      tags: ["Categories"],
      summary: "Edita um categoria através do ID",
      description: "Essa rota edita um categoria baseado no parâmetro passado",
      parameters: [
        {
          type: "string",
          name: "id",
          in: "path",
          description: "ID da categoria",
          required: true,
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: categoriesSchemas.content,
          },
        },
      },
      responses: {
        200: responses[200].category,
        400: responses[400],
        401: responses[401],
        403: responses[403],
      },
    },
    delete: {
      tags: ["Categories"],
      summary: "Deletar por ID",
      description: "Deleta uma categoria baseado no ID passado como parâmetro",
      parameters: [
        {
          type: "string",
          name: "id",
          in: "path",
          description: "ID da categoria",
          required: true,
        },
      ],
      responses: {
        200: responses[200].category,
        400: responses[400],
        401: responses[401],
        403: responses[403],
      },
    },
  },
  "/categories/guide/{id}": {
    get: {
      tags: ["Categories"],
      summary: "Retorna todas as categorias vinculadas a um guia",
      description: "Rota para retornar as categorias que contém o mesmo guia",
      parameters: [
        {
          type: "string",
          name: "id",
          in: "path",
          description: "ID do Guia",
          required: true,
        },
      ],
      responses: {
        200: {
          description: "Categorias da aplicação",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: categoriesSchemas.dataResponse,
                  },
                },
              },
            },
          },
        },
        400: responses[400],
      },
    },
  },
  "/categories/delete/{id}": {
    patch: {
      tags: ["Categories"],
      summary: "Realiza o Delete Lógico pelo ID",
      description: "Essa rota deleta logicamente uma categoria baseado no parâmetro passado",
      parameters: [
        {
          type: "string",
          name: "id",
          in: "path",
          description: "ID da categoria",
          required: true,
        },
      ],
      responses: {
        200: responses[200].category,
        400: responses[400],
        401: responses[401],
        403: responses[403],
      },
    },
  },
};
