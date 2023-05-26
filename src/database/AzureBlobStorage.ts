import { MulterAzureStorage } from "multer-azure-blob-storage";

export const azureStorage: MulterAzureStorage = new MulterAzureStorage({
  connectionString: process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING,
  accessKey: process.env.AZURE_BLOB_STORAGE_ACCOUNT_KEY,
  accountName: process.env.AZURE_BLOB_STORAGE_ACCOUNT_NAME,
  containerName: process.env.AZURE_BLOB_STORAGE_CONTAINER_NAME!,
  containerAccessLevel: "blob",
  urlExpirationTime: 60,
});
