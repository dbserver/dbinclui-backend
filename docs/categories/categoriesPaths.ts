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
  },
};
