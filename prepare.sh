#!/bin/bash

echo "npm -v"
npm -v
echo "node -v"
node -v

#disable to speed up builds npm will be run as a build task toggled on an off as needed.
echo "npm update"
npm update

# add any locally installed node modules cli's to the path
export PATH=$PATH:${PWD}/node_modules/.bin

echo "bower install --force-latest --allow-root"
bower install --force-latest --allow-root