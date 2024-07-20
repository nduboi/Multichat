FROM node:latest
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 80
EXPOSE 8080
EXPOSE 1935
CMD [ "node", "index.js" ]