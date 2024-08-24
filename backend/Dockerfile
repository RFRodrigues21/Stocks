# Stage 1: Build the TypeScript code
FROM node:18-alpine AS build

WORKDIR /

COPY . ./
RUN npm install

CMD ["npm", "run", "dev"]
