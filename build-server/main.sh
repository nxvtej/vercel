#!/bin/bash

export GIT_REPOSITORY__URL="$GIT_REPOSITORY__URL"
# export GIT_REPOSITORY__URL="https://github.com/nxvtej/vercel-test.git"

git clone "$GIT_REPOSITORY__URL" /home/app/output

exec node script.js