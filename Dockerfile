FROM node:alpine

#Ambiente de desenvolvimento
ENV MONGO_URL=$(MongoUrlDBinclui)
ENV MONGO_DATABASE=$(MongoDatabaseDBinclui)
ENV NODE_ENV=$(NodeEnvDBinclui)
ENV HOST=$(HostDBinclui)
ENV PORT=$(PortDBinclui)
ENV FIREBASE_TYPE=$(FirebaseTypeDBinclui)
ENV FIREBASE_PROJECT_ID=$(FirebaseProjectIdDBinclui)
ENV FIREBASE_PRIVATE_KEY_ID=$(FirebasePrivateKeyIdDBinclui)
ENV FIREBASE_PRIVATE_KEY=$(FirebasePrivateKeyDBinclui)
ENV FIREBASE_CLIENT_EMAIL=$(FirebaseClientEmailDBinclui)
ENV FIREBASE_CLIENT_ID=$(FirebaseClientIdDBinclui)
ENV FIREBASE_AUTH_URI=$(FirebaseAuthUriDBinclui)
ENV FIREBASE_TOKEN_URI=$(FirebaseTokenUriDBinclui)
ENV FIREBASE_CLIENT_X509_CERT_URL=$(FirebaseClientX509CertUrlDBinclui)
ENV FIREBASE_AUTH_PROVIDER_X509_CERT_URL=$(FirebaseAuthProviderX509CertUrlDBinclui)
ENV HOST_UPLOAD=$(CloudinaryHostUploadDBinclui)
ENV CLOUD_NAME=$(CloudinaryNameDBinclui)
ENV CLOUD_API_KEY=$(CloudinaryApiKeyDBinclui)
ENV CLOUD_API_SECRET=$(CloudinaryApiSecretDBinclui)

ARG MongoUrlDBinclui
ARG MongoDatabaseDBinclui
ARG NodeEnvDBinclui
ARG HostDBinclui
ARG PortDBinclui
ARG FirebaseTypeDBinclui
ARG FirebaseProjectIdDBinclui
ARG FirebasePrivateKeyIdDBinclui
ARG FirebasePrivateKeyDBinclui
ARG FirebaseClientEmailDBinclui
ARG FirebaseClientIdDBinclui
ARG FirebaseAuthUriDBinclui
ARG FirebaseTokenUriDBinclui
ARG FirebaseClientX509CertUrlDBinclui
ARG FirebaseAuthProviderX509CertUrlDBinclui
ARG CloudinaryHostUploadDBinclui
ARG CloudinaryNameDBinclui
ARG CloudinaryApiKeyDBinclui
ARG CloudinaryApiSecretDBinclui

## setting container
WORKDIR /usr/src/app

COPY *.json ./

RUN npm install

COPY --chown=node:node . ./

EXPOSE 8080

CMD ["node", "./dist/src/index.js"]

