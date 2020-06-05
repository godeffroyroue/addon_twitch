FROM node:10
RUN mkdir app
COPY /api/ /server/api
COPY server.js /server
COPY database.js /server
COPY package.json /server
WORKDIR /server
RUN npm install
EXPOSE 7070
CMD npm start