FROM node:12.4.0

RUN mkdir -p /project/home
WORKDIR /project/home
RUN mkdir ./settings

COPY ./package*.json ./
COPY ./index.js ./
COPY ./content ./content

RUN npm install .

ENTRYPOINT [ "npm", "start" ]
