#!/bin/bash

HEAD=$(git log --pretty=format:'%h' -n 1)

docker build -t dbhan:${HEAD} .
