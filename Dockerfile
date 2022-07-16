FROM node:16

WORKDIR /app
COPY package.json /app
RUN npm install
EXPOSE 5000
CMD ["node", "app.js"]
