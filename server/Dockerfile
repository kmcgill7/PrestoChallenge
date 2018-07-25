FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD server/package*.json ./
RUN npm install --production

ADD server /usr/src/app

EXPOSE 8080
CMD npm start
