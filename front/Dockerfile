# Frontend - React + Vite
FROM node:18 AS build

WORKDIR /app
COPY front/package*.json ./
RUN npm install

COPY front/ ./
RUN npm run build

# Serve con nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY front/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
