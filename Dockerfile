FROM node:alpine

#Ambiente de desenvolvimento
ARG NODE_ENV
ENV NODE_ENV=${NodeEnvDBinclui}

#Configuração do Servidor
ARG HOST
ENV HOST=${HostDBinclui}

ARG PORT
ENV PORT=${PortDBinclui}

#Configuração MongoDB
ARG MONGO_URL
ENV MONGO_URL=${MongoUrlDBinclui}
#
ARG MONGO_DATABASE
ENV MONGO_DATABASE=${MongoDatabaseDBinclui}


#Configurações Firebase Admin
ARG FIREBASE_TYPE
ENV FIREBASE_TYPE=${FirebaseTypeDBinclui}
#
ARG FIREBASE_PROJECT_ID
ENV FIREBASE_PROJECT_ID=${FirebaseProjectIdDBinclui}
#
ARG FIREBASE_PRIVATE_KEY_ID
ENV FIREBASE_PRIVATE_KEY_ID=${FirebasePrivateKeyIdDBinclui}
#
ARG FIREBASE_PRIVATE_KEY
ENV FIREBASE_PRIVATE_KEY=${FirebasePrivateKeyDBinclui}
#
ARG FIREBASE_CLIENT_EMAIL
ENV FIREBASE_CLIENT_EMAIL=${FirebaseClientEmailDBinclui}
#
ARG FIREBASE_CLIENT_ID
ENV FIREBASE_CLIENT_ID=${FirebaseClientIdDBinclui}
#
ARG FIREBASE_AUTH_URI
ENV FIREBASE_AUTH_URI=${FirebaseAuthUriDBinclui}
#
ARG FIREBASE_TOKEN_URI
ENV FIREBASE_TOKEN_URI=${FirebaseTokenUriDBinclui}
#
ARG FIREBASE_AUTH_PROVIDER_X509_CERT_URL
ENV FIREBASE_AUTH_PROVIDER_X509_CERT_URL=${FirebaseAuthProviderX509CertUrlDBinclui}
#
ARG FIREBASE_CLIENT_X509_CERT_URL
ENV FIREBASE_CLIENT_X509_CERT_URL=${FirebaseClientX509CertUrlDBinclui}

#Configuração Cloudinary
ARG HOST_UPLOAD
ENV HOST_UPLOAD=${CloudinaryHostUploadDBinclui}

ARG CLOUD_NAME
ENV CLOUD_NAME=${CloudinaryNameDBinclui}

ARG CLOUD_API_KEY
ENV CLOUD_API_KEY=${CloudinaryApiKeyDBinclui}

ARG CLOUD_API_SECRET
ENV CLOUD_API_SECRET=${CloudinaryApiSecretDBinclui}


## setting container

ENV WORKDIR /usr/src/app

COPY *.json ./

RUN apk add --no-cache curl

RUN npm install

COPY . . 

EXPOSE 3000

CMD ["node", "./dist/src/index.js"]