#!/bin/bash
. .env

echo "installing modules for web app"
docker run --rm --name node_builder -v $WEB_APP_PATH:/app -w /app node:latest bash -c "npm install"

echo "installing modules for publisher test app"
docker run --rm --name node_builder -v $PUBLISHER_APP_PATH:/app -w /app node:latest bash -c "npm install"