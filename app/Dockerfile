FROM node:latest
WORKDIR /app
COPY . /app
RUN npm install
RUN npm install -g node-dev
EXPOSE 80
EXPOSE 8080
EXPOSE 1935
CMD [ "node-dev", "index.js" ]