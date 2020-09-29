FROM node:13.12.0-alpine

ARG registry_auth_token
ENV NPM_REGISTRY_AUTH=$registry_auth_token

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
COPY .npmrc ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g

COPY . ./
CMD ["npm", "start"]