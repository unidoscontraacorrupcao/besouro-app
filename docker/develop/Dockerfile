FROM besouro/app:base

WORKDIR /root

COPY ./app/package.json /root/package.json

RUN yarn install

CMD ["polymer", "serve", "-H", "0.0.0.0"]
