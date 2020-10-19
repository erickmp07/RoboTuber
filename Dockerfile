# References
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
# https://github.com/nodejs/docker-node/blob/master/README.md#how-to-use-this-image

FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A widcard is used to ensure both package.json and package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "node", "index.js" ]