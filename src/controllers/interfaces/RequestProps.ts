export interface RequestFileProps {
  path: string;
  filename: string;
}

export interface AzureBlobStorageResponse {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  url: string;
  blobName: string;
  etag: string;
  blobType: string;
  container: string;
  blobSize: string;
}
