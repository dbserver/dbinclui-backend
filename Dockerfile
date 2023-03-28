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

ARG MONGO_DATABASE
ENV MONGO_DATABASE=${MONGO_DATABASE_DBINCLUI}

#####

ENV WORKDIR /usr/src/app

COPY *.json ./

RUN apk add --no-cache curl

RUN npm install

COPY . . 

EXPOSE 3000

CMD ["node", "./dist/src/index.js"]