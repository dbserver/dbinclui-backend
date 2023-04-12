FROM node:alpine

## setting container

ENV WORKDIR /usr/src/app

COPY *.json ./

RUN apk add --no-cache curl

RUN npm install

COPY . . 

CMD ["node", "./dist/src/index.js"]

EXPOSE 8080