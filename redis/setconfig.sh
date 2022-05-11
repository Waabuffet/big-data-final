
# note that this is not needed for pub sub, it was only relevant with list commands
docker exec -it redis bash -c "redis-cli config set notify-keyspace-events AKE"

