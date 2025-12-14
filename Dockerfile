FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE ${PUBLIC_NEST_PORT}

CMD ["npm", "run", "start:prod"]