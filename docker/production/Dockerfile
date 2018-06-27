FROM besouro/app:dev as app

ARG api_url=localhost:8000

# TODO: Change it to a better approach to change API URL
RUN find src -type f -exec sed -i "s/localhost:8000/$api_url/g" {} \;

RUN polymer build --preset es6-bundled

FROM nginx:1.13

COPY --from=app /root/build/es6-bundled/ /usr/share/nginx/html/
COPY --from=app /root/fonts /usr/share/nginx/html/fonts

COPY ./docker/production/default.conf /etc/nginx/conf.d/default.conf
