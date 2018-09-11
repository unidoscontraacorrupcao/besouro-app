#!/bin/bash

rm -rf build-prod
rm -rf build

enable_analytics() {
   sed -i 's#<!--analytics##g' index.html
   sed -i 's#analytics-->##g' index.html
}

build_for_safari() {
    env=$1
    safari_commit=297de5b696a53e8a6a6df9b55ae68f30a6f8d824
    git checkout -b build_safari
    git cherry-pick $safari_commit
    polymer build --preset es6-bundled
    mv build /tmp/build-safari-$env
    git checkout -
    git branch -D build_safari
}

build_for_prod() {
   polymer build --preset es6-bundled
   mv build build-prod
   sed -i "s@http://localhost:8000@https://app.unidoscontraacorrupcao.org.br@g" build-prod/es6-bundled/src/app-elements/app-shell.js
   sed -i "s@http://localhost:8081@https://app.unidoscontraacorrupcao.org.br@g" build-prod/es6-bundled/src/app-elements/app-shell.js
   sed -i "s@https://maps.googleapis.com/maps/api/js?key=@https://maps.googleapis.com/maps/api/js?key=AIzaSyCy8kVxay78Uqku6yXbFTy2ZeFsHAQir54@g" build-prod/es6-bundled/index.html
   tar -czvf build.tar.gz /tmp/build-safari-prod
   rm -rf build-prod
   git checkout index.html
}

build_for_dev() {
    polymer build --preset es6-bundled
    sed -i "s@http://localhost:8000@https://dev.besouro.ejplatform.org@g" build/es6-bundled/src/app-elements/app-shell.js
    sed -i "s@http://localhost:8081@https://dev.besouro.ejplatform.org@g" build/es6-bundled/src/app-elements/app-shell.js
    sed -i "s@https://maps.googleapis.com/maps/api/js?key=@https://maps.googleapis.com/maps/api/js?key=AIzaSyCy8kVxay78Uqku6yXbFTy2ZeFsHAQir54@g" build/es6-bundled/index.html
    tar -czvf build.tar.gz build /tmp/build-safari-dev
    rm -rf build
}

enable_analytics=$1

if [[ -n $enable_analytics ]]; then
    build_for_safari prod
    build_for_production
else
    build_for_safari dev
    build_for_dev
fi

scp build.tar.gz besouro:/tmp
