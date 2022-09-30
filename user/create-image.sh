#!/usr/bin/env bash

docker rm -f user-service

docker rmi user-service

docker image prune

docker volume prune

docker build -t user-service .