FROM besouro/app:dev as app

ARG api_host=localhost:8000

COPY ./app /root

# TODO: Change it to a better approach to change API URL
RUN find src -type f -exec sed -i "s/localhost:8000/$api_host/g" {} \;

RUN polymer build --preset es6-bundled

FROM nginx:1.13

COPY ./docker/production/default.conf /etc/nginx/conf.d/default.conf

COPY --from=app /root/build/es6-bundled/ /usr/share/nginx/html/
COPY --from=app /root/fonts /usr/share/nginx/html/fonts
