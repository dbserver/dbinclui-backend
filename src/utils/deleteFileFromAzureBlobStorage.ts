import { FileProps } from "../interfaces/FilePropsInterface";
import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";

export const azureBlobStorageClient = () => {
  const accountName = process.env.AZURE_BLOB_STORAGE_ACCOUNT_NAME;
  const accountKey = process.env.AZURE_BLOB_STORAGE_ACCOUNT_KEY;
  const storageAccountBaseUrl = `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential = new StorageSharedKeyCredential(accountName!, accountKey!);

  const blobServiceClient = new BlobServiceClient(storageAccountBaseUrl, sharedKeyCredential);

  return blobServiceClient;
};

export const deleteFilesFromAzureBlobStorage = async (images: FileProps[]) => {
  const blobContainer = azureBlobStorageClient().getContainerClient("dbinclui-files");

  images.forEach((image) => blobContainer.deleteBlob(image.publicId));
};
