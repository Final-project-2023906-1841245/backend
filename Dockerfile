FROM node:16

WORKDIR /app
COPY package.json /app
EXPOSE 5000
CMD ["npm", "install"]
CMD ["node", "app.js"]
