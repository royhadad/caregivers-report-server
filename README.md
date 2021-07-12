# Skeleton of a node.js / typescript / express / postgres app

## Install Node / NPM
https://docs.npmjs.com/getting-started/installing-node

## Install TypeScript
https://www.npmjs.com/package/typescript

## Download this repo
download and run `npm install`

## Set the following ENV VARs for your DB Connections:
`export DB_USER=''  DB='' DB_PASS='' DB_HOST='' DB_PORT='' DB_MAX_CLIENTS='' DB_IDLE_TIMEOUT_MS=''`

this can also be done by creating a `.env` file in the root of this project see `.env.example` for a reference

## Run sql files
Run the following sql files:
    - caregiver.sql
    - patient.sql
    - visit.sql

## Transpile TypeScript to the build folder
run `tsc`

you can adjust transpiling settings in tsconfig.json

## Run your built node app
`node build/app.js`

## Routes
http://localhost:3000/healthcheck and root return healthcheck
