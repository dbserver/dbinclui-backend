FROM node:alpine

## setting container

ENV WORKDIR /usr/src/app

COPY *.json ./

RUN apk add --no-cache curl

RUN npm install

COPY . . 

EXPOSE 3000

CMD ["node", "./dist/src/index.js"]