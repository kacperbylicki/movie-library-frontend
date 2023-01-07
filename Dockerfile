FROM node:latest as build

# Create a working directory
WORKDIR /app

ENV VITE_API_URL=

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies using Yarn
RUN yarn install

# Copy the source code
COPY . .

# Build the app
RUN yarn build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]