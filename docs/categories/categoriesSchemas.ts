export const categoriesSchemas = {
  content: {
    type: "object",
    properties: {
      title: {
        type: "string",
        example: "Título da categoria",
      },
      shortDescription: {
        type: "string",
        example: "Descrição da categoria",
      },
      guide: {
        type: "string",
        example: "ID do guia",
      },
    },
  },
  dataResponse: {
    type: "object",
    description: "Requisição concluída com sucesso",
    example: {
      _id: "ID da categoria",
      title: "Título da categoria",
      shortDescription: "Descrição da categoria",
      author: "Referência do autor",
      guide: "Referência do guia",
      deleted: "Status do guia",
    },
  },
};
