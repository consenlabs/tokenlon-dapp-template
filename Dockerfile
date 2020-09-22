FROM node:11.15.0-alpine

RUN apk add nginx git python build-base --no-cache --update && \
    rm -rf /var/cache/apk/* && \
    chown -R nginx:www-data /var/lib/nginx

RUN mkdir /app
WORKDIR /app
COPY package.json /app/
RUN rm -rf package-lock.json && rm -rf node_modules && rm -rf ~/.node-gyp && npm install

COPY ./ /app/
RUN npm run build

# Copy a configuration file from the current directory
COPY nginx.conf /etc/nginx/

RUN mkdir -p /var/www/html/otc-dapp /run/nginx

RUN cp -r application/build/* /var/www/html/otc-dapp
RUN cp -r application/build/* /var/www/html

# Append "daemon off;" to the beginning of the configuration

# Expose ports
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
