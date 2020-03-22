FROM node:13.6.0

WORKDIR /web-app/

COPY .env* ./
COPY .sequelizerc ./
COPY package*.json ./

RUN npm install

COPY src src

CMD ["npm", "run", "start"]