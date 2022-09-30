#!/usr/bin/env bash

docker service create --replicas 1 --name gofood-service -p 3003:3003 theone28/gofood-service