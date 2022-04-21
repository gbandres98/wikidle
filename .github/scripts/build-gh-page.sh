#!/bin/bash

git checkout --orphan gh-pages

echo "Building started..."

npm install
npm run build

git config user.email "mail@gbandres.com"
git config user.name "gbandres98"

git --work-tree dist add --all
git --work-tree dist commit -m "gh-pages"

echo "Pushing to gh-pages..."

git push origin HEAD:gh-pages --force