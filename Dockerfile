FROM --platform=linux/amd64 node:18

ENV NODE_ENV=production

WORKDIR .

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD node main.js