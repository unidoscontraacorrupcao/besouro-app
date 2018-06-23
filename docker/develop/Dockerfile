FROM debian:buster-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
      git \
      wget \
      xz-utils \
      && rm -rf /var/lib/apt/lists/*

RUN wget https://nodejs.org/dist/v10.5.0/node-v10.5.0-linux-x64.tar.xz --no-check-certificate -P /tmp \
  && tar -xJvf /tmp/node-v10.5.0-linux-x64.tar.xz -C /usr/lib \
  && mv /usr/lib/node-v10.5.0-linux-x64 /usr/lib/node \
  && rm -rf /tmp/node-v10.5.0-linux-x64.tar.xz

ENV PATH="/usr/lib/node/bin:${PATH}"

RUN npm install -g yarn \
    && yarn global add polymer-cli

RUN yarn install

COPY ./app /root

WORKDIR /root

CMD ["polymer", "serve", "-H", "0.0.0.0"]
