FROM node:alpine

## setting container
WORKDIR /usr/src/app

COPY --chown=node:node . ./

RUN npm install

EXPOSE 8080

CMD ["node", "./dist/src/index.js"]

