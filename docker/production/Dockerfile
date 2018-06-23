FROM besouro/app:dev as app

ARG API_URL=localhost:8000

# TODO: Change it to a better approach to change API URL
RUN find app -type f -exec sed -i "s/localhost:8000/\"&\"/g" "$API_URL" {} \;

RUN polymer build --preset es6-bundled

FROM nginx:1.13

COPY ./docker/production/nginx/default.conf /etc/nginx/conf.d/default.conf
