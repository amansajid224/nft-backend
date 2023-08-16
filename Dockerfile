FROM node:18

# Create app directory
WORKDIR /usr/src/customer-analytics

# Install app dependencies
COPY package.json .

RUN npm config set registry https://registry.npmjs.org/

RUN npm install pm2 -g

RUN npm install --save-exact

# Bundle app source
COPY . .

CMD ["pm2-docker", "index.js"]