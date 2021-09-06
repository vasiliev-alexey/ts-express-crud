FROM node:16.8.0

LABEL version="1.0"


WORKDIR /app

ADD './dist' '/app'
ADD './node_modules' '/app/node_modules'

EXPOSE 3000


CMD ["node", "/app/backend/index.js"]

