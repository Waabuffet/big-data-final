@echo off

@REM replace $WEB_APP_PATH and $PUBLISHER_APP_PATH with respective full paths for the apps folders

echo "installing modules for web app"
docker run --rm --name node_builder -v $WEB_APP_PATH:/app -w /app node:latest bash -c "npm install"

echo "installing modules for publisher test app"
docker run --rm --name node_builder -v $PUBLISHER_APP_PATH:/app -w /app node:latest bash -c "npm install"