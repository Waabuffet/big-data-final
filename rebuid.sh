# docker-compose down
# docker-compose up -d --build
# ./redis/setconfig.sh

# # docker logs -f web-app

# docker run --rm --name node_builder -v $(pwd)/webapp:/app -w /app node:latest bash -c "npm install"

# docker-compose down && docker-compose up -d

docker stop web-app && docker start web-app

