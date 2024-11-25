FROM node:lts-alpine

WORKDIR /home/amir/app/

COPY ./src/package*.json ./

RUN npm install

COPY ./src/ ./

EXPOSE $PORT

USER node

CMD ["npm", "run", "dev"]