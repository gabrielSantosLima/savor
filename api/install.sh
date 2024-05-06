#!/bin/bash

# Setup npm
echo "[1/4] Initializing project"
npm init

# Creating files/folders
echo "[2/4] Creating files"
mkdir src
echo "import 'dotenv/config';import express from 'express'; const app = express();const PORT = process.env.PORT || 3000; app.listen(PORT);" > src/index.ts

# Installing dependencies
echo "[3/4] Installing dependencies"
npm i express
npm i nodemon typescript eslint prettier eslint-config-prettier eslint-plugin-prettier @types/express @types/node ts-node ts-jest @types/jest dotenv --save-dev

# Configurations
echo "[4/4] Configurating project"

## Jest
npx ts-jest config:init
mkdir test
echo "describe('Hello Tests', () => {it('Should be 4', () => {expect(2 + 2).toBe(4)})})" > test/hello.spec.ts

## Eslint config
npx eslint --init
curl https://gist.githubusercontent.com/gabrielSantosLima/bfc5777a18b981cf5442297383e25cd7/raw/c8271147d141576e95061e8a9c68a4265197ee68/.eslintrc.json > .eslintrc.json 

## Typescript config
npx tsc --init

## Prettier config
curl https://gist.githubusercontent.com/gabrielSantosLima/b8af5c64acba8d40ff129fad8b44e723/raw/9f3a04b0e5ffb2e55b377a4f502cd0fd076302be/.prettierrc.json > .prettierrc.json 

## Other configs
curl https://gist.githubusercontent.com/gabrielSantosLima/73635d289a1f151900e8f61caf94ea4a/raw/445f52d17a5a2dae051133e38c172d1f25b1160c/.gitignore > .gitignore
echo "PORT=3000" > .env.example
echo "PORT=3000" > .env

echo "Done."