FROM node:alpine

WORKDIR /app

COPY . /app

RUN chmod -R 777 /app

#RUN npm install -g cross-env

#RUN npm install sharp

EXPOSE 3096

CMD [ "npm" ,"run", "prod" ]