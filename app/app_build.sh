#!/bin/bash

rm -rf build-prod
rm -rf build

enable_analytics=$1

if [[ -n $enable_analytics ]]; then
   sed -i 's#<!--analytics##g' index.html
   sed -i 's#analytics-->##g' index.html
   polymer build --preset es6-bundled
   mv build build-prod
   sed -i "s@http://localhost:8000@https://app.unidoscontraacorrupcao.org.br@g" build-prod/es6-bundled/src/app-elements/app-shell.js
   sed -i "s@http://localhost:8081@https://app.unidoscontraacorrupcao.org.br@g" build-prod/es6-bundled/src/app-elements/app-shell.js
    sed -i "s@https://maps.googleapis.com/maps/api/js?key=@https://maps.googleapis.com/maps/api/js?key=AIzaSyCy8kVxay78Uqku6yXbFTy2ZeFsHAQir54@g" build-prod/es6-bundled/index.html
   tar -czvf build.tar.gz build-prod
   rm -rf build-prod
   git checkout index.html
else
    polymer build --preset es6-bundled
    sed -i "s@http://localhost:8000@https://dev.besouro.ejplatform.org@g" build/es6-bundled/src/app-elements/app-shell.js
    sed -i "s@http://localhost:8081@https://dev.besouro.ejplatform.org@g" build/es6-bundled/src/app-elements/app-shell.js
    sed -i "s@https://maps.googleapis.com/maps/api/js?key=@https://maps.googleapis.com/maps/api/js?key=AIzaSyCy8kVxay78Uqku6yXbFTy2ZeFsHAQir54@g" build/es6-bundled/index.html
    tar -czvf build.tar.gz build
    rm -rf build
fi
scp build.tar.gz besouro:/tmp
