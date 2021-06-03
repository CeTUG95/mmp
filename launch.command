#!/bin/bash

echo "launching app in chrome..."

cd -- "$(dirname "$0")"

BASEDIR=$(pwd)

open /Applications/Google\ Chrome.app --args --allow-file-access-from-files --enable- "$BASEDIR"/0_VideoAudioPlayer_Generator_v1.html 