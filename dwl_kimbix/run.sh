#!/bin/bash
export XDG_RUNTIME_DIR=/tmp/xdg-runtime-$(id -u)
mkdir -p $XDG_RUMTIME_DIR
dwl
