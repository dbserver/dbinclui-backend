FROM node:alpine

## setting container
WORKDIR /usr/src/app

COPY *.json ./

RUN npm install

COPY --chown=node:node . ./

EXPOSE 8080

CMD ["node", "./dist/src/index.js"]

