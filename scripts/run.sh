#!/bin/bash
HEAD=$(git log --pretty=format:'%h' -n 1)

docker run -it --name dbahn-app -p 8080:80 --rm dbhan:${HEAD}
