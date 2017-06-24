FROM node

ADD . /code

WORKDIR /code

RUN npm install

EXPOSE 4200

ENTRYPOINT ["npm", "start"]