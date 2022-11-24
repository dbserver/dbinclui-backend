export const guideSchemaSettings = {
  title: {
    type: String,
    required: true,
    maxlength: 32,
  },
  content: {
    type: String,
    required: true,
  },
  filePaths: {
    type: {
      filePath: String,
      publicId: String,
    },
    required: true,
  },
};
