FROM cypress/base:14.17.0

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "run", "test"]
