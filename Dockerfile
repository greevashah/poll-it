FROM node:8.11.1-slim

WORKDIR /app

COPY . /app

RUN npm install -i

EXPOSE 8000

CMD ["npm","run","test"]