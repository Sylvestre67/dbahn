#!/bin/bash
# This assumes you have a .env file with your
# apollo ENGINE_API_KEY value at the root of the project.
# See here: https://engine.apollographql.com
source .env

# quick healthy check on our config/services
apollo client:check

# this will generate all types based on the found gql
# and put them in a __generated__ folder.
apollo client:codegen --target typescript
