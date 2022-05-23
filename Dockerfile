FROM node:lts-alpine

ARG PORT_input=8080
ARG UPLOAD_input='uploads/'
ARG URI_input='/'
ARG LOG_FORMAT_input='combined'
ARG NAME_input
ARG NODE_ENV_input='production'

ENV PORT=$PORT_input
ENV UPLOAD=$UPLOAD_input
ENV URI=$URI_input
ENV LOG_FORMAT=$LOG_FORMAT_input
ENV NAME=$NAME_input
ENV NODE_ENV=$NODE_ENV_input

WORKDIR /app
COPY . .
RUN npm ci
EXPOSE $PORT

CMD ["npm", "start"]
