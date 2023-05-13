FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g prisma

RUN npm run postinstall

EXPOSE 3000

CMD ["npm", "run" , "dev"]

