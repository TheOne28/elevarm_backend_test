#!/usr/bin/env bash

docker rm -f gofood-service

docker rmi gofood-service

docker image prune

docker volume prune

docker build -t gofood-service .