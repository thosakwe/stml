#!/usr/bin/env bash
for file in "$@"
do
    cat "$file" && echo && echo
done