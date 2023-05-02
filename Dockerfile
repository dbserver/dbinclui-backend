FROM node:hydrogen-alpine

ENV MONGO_URL=$(MongoUrlDBinclui)
ARG MongoUrlDBinclui

ENV MONGO_DATABASE=$(MongoDatabaseDBinclui)
ARG MongoDatabaseDBinclui

ENV NODE_ENV=$(NodeEnvDBinclui)
ARG NodeEnvDBinclui

ENV HOST=$(HostDBinclui)
ARG HostDBinclui

ENV PORT=$(PortDBinclui)
ARG PortDBinclui

ENV FIREBASE_TYPE=$(FirebaseTypeDBinclui)
ARG FirebaseTypeDBinclui

ENV FIREBASE_PROJECT_ID=$(FirebaseProjectIdDBinclui)
ARG FirebaseProjectIdDBinclui

ENV FIREBASE_PRIVATE_KEY_ID=$(FirebasePrivateKeyIdDBinclui)
ARG FirebasePrivateKeyIdDBinclui

ENV FIREBASE_PRIVATE_KEY=$(FirebasePrivateKeyDBinclui)
ARG FirebasePrivateKeyDBinclui

ENV FIREBASE_CLIENT_EMAIL=$(FirebaseClientEmailDBinclui)
ARG FirebaseClientEmailDBinclui

ENV FIREBASE_CLIENT_ID=$(FirebaseClientIdDBinclui)
ARG FirebaseClientIdDBinclui

ENV FIREBASE_AUTH_URI=$(FirebaseAuthUriDBinclui)
ARG FirebaseAuthUriDBinclui

ENV FIREBASE_TOKEN_URI=$(FirebaseTokenUriDBinclui)
ARG FirebaseTokenUriDBinclui

ENV FIREBASE_CLIENT_X509_CERT_URL=$(FirebaseClientX509CertUrlDBinclui)
ARG FirebaseClientX509CertUrlDBinclui

ENV FIREBASE_AUTH_PROVIDER_X509_CERT_URL=$(FirebaseAuthProviderX509CertUrlDBinclui)
ARG FirebaseAuthProviderX509CertUrlDBinclui

ENV HOST_UPLOAD=$(CloudinaryHostUploadDBinclui)
ARG CloudinaryHostUploadDBinclui

ENV CLOUD_NAME=$(CloudinaryNameDBinclui)
ARG CloudinaryNameDBinclui

ENV CLOUD_API_KEY=$(CloudinaryApiKeyDBinclui)
ARG CloudinaryApiKeyDBinclui

ENV CLOUD_API_SECRET=$(CloudinaryApiSecretDBinclui)
ARG CloudinaryApiSecretDBinclui



## setting container
WORKDIR /usr/src/app

COPY *.json ./

RUN npm install

COPY --chown=node:node . ./

EXPOSE 8080

CMD ["node", "./dist/src/index.js"]

