#!/usr/bin/env bash

docker service create --replicas 1 --name user-service -p 3002:3002 theone28/user-service