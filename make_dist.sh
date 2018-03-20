#!/usr/bin/env bash
npm run build
mv dist dist_front
cp -r -f dist_front ../backend
mv dist_front dist
echo Complete compile
