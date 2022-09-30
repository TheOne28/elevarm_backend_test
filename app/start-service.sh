#!/usr/bin/env bash

docker service create --replicas 1 --name api-gateway -p 3000:3000 theone28/api-gateway