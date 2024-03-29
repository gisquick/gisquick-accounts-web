FROM node:14-alpine AS webapp

WORKDIR /web/
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --modern


FROM gisquick/webapp-container

COPY --from=webapp /web/dist/ /var/www
CMD /bin/true
