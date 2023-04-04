FROM node:alpine

#Ambiente de desenvolvimento
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV_DBINCLUI}

#Configuração do Servidor
ARG HOST
ENV HOST=${HOST_DBINCLUI}

ARG PORT
ENV PORT=${PORT_DBINCLUI}

#Configuração MongoDB
ARG MONGO_URL
ENV MONGO_URL=${MONGO_URL_DBINCLUI}
#
ARG MONGO_DATABASE
ENV MONGO_DATABASE=${MONGO_DATABASE_DBINCLUI}


#Configurações Firebase Admin
ARG FIREBASE_TYPE
ENV FIREBASE_TYPE=${FIREBASE_TYPE_DBINCLUI}
#
ARG FIREBASE_PROJECT_ID
ENV FIREBASE_PROJECT_ID=${FIREBASE_PROJECT_ID_DBINCLUI}
#
ARG FIREBASE_PRIVATE_KEY_ID
ENV FIREBASE_PRIVATE_KEY_ID=${FIREBASE_PRIVATE_KEY_ID_DBINCLUI}
#
ARG FIREBASE_PRIVATE_KEY
ENV FIREBASE_PRIVATE_KEY=${FIREBASE_PRIVATE_KEY_DBINCLUI}
#
ARG FIREBASE_CLIENT_EMAIL
ENV FIREBASE_CLIENT_EMAIL=${FIREBASE_CLIENT_EMAIL_DBINCLUI}
#
ARG FIREBASE_CLIENT_ID
ENV FIREBASE_CLIENT_ID=${FIREBASE_CLIENT_ID_DBINCLUI}
#
ARG FIREBASE_AUTH_URI
ENV FIREBASE_AUTH_URI=${FIREBASE_AUTH_URI_DBINCLUI}
#
ARG FIREBASE_TOKEN_URI
ENV FIREBASE_TOKEN_URI=${FIREBASE_TOKEN_URI_DBINCLUI}
#
ARG FIREBASE_AUTH_PROVIDER_X509_CERT_URL
ENV FIREBASE_AUTH_PROVIDER_X509_CERT_URL=${FIREBASE_AUTH_PROVIDER_X509_CERT_URL_DBINCLUI}
#
ARG FIREBASE_CLIENT_X509_CERT_URL
ENV FIREBASE_CLIENT_X509_CERT_URL=${FIREBASE_CLIENT_X509_CERT_URL_DBINCLUI}

#Configuração Cloudinary
ARG HOST_UPLOAD
ENV HOST_UPLOAD=${CLOUD_HOST_UPLOAD_DBINCLUI}

ARG CLOUD_NAME
ENV CLOUD_NAME=${CLOUD_NAME_DBINCLUI}

ARG CLOUD_API_KEY
ENV CLOUD_API_KEY=${CLOUD_API_KEY_DBINCLUI}

ARG CLOUD_API_SECRET
ENV CLOUD_API_SECRET=${CLOUD_API_SECRE_DBINCLUI}


## setting container

ENV WORKDIR /usr/src/app

COPY *.json ./

RUN apk add --no-cache curl

RUN npm install

COPY . . 

EXPOSE 3000

CMD ["node", "./dist/src/index.js"]