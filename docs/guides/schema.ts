export const guideSchema = {
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
};
