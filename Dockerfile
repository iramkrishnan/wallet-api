FROM node:13.14.0-alpine

#install native libraries to install python
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --quiet node-gyp -g &&\
  npm install --quiet

#remove native libraries/ no longer usable
RUN apk del native-deps

ENV USER=nodejs
ENV SERVICE_NAME=wallet-api
RUN addgroup -S nodejs && adduser \
    --disabled-password \
    --gecos "" \
    -s '/bin/sh' \
    --ingroup "$USER" \
    "$USER"


RUN mkdir /home/nodejs/${SERVICE_NAME}
RUN chown nodejs:nodejs /home/nodejs/${SERVICE_NAME}
USER nodejs
WORKDIR /home/nodejs/${SERVICE_NAME}

COPY package.json .
#RUN npm i eslint -g
RUN npm set progress=false && \
  npm i --silent

COPY . .

CMD ["npm", "start"]