FROM node:latest

ENV HOME=/usr/src

COPY . ${HOME}/app/

WORKDIR ${HOME}/app

RUN rm -rf node_modules
RUN npm install --silent --progress=true

EXPOSE 3002

CMD ["npm", "run", "dev"]