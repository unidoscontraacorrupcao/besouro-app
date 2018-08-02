#!/bin/bash

rm -rf build-prod
rm -rf build

enable_analytics=$1

if [[ -n $enable_analytics ]]; then
   sed -i 's#<!--analytics##g' src/login-elements/sign-up-view.js
   sed -i 's#analytics-->##g' src/login-elements/sign-up-view.js
   sed -i 's#<!--analytics##g' index.html
   sed -i 's#analytics-->##g' index.html
   polymer build --preset es6-bundled
   mv build build-prod
   tar -czvf build.tar.gz build-prod
   rm -rf build-prod
   git checkout src/login-elements/sign-up-view.js
   git checkout index.html
else
    polymer build --preset es6-bundled
    tar -czvf build.tar.gz build
    rm -rf build
fi

scp build.tar.gz besouro:/tmp
