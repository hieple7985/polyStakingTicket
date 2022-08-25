# Poly-Staking-Ticket Api

## Table of contents

* [General Info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info

Api Base Source Path: /api/**

## Technologies

### Tech-Stack

* PostgreSQL: v14
* Hasura Cloud: v2
* Docker: 4.10.1

## Setup

* Link: <https://hasura.io/docs/latest/graphql/core/index/>

### Prequisites

```sh
node v16
node-fetch: "2.6.0",
```

### Deployment

#### Heroku

```sh
* Step-1: git init
* Step-2: heroku git:remote -a ntsv4a
* Step-3: git add .
* Step-4: git commit -am "init"
* Step-5: git push heroku master
```

* Note: Currently, nodejs is being deployed to Heroku v12

#### Hasura

``` sh
* Step-1: Initial setup​ Link GitHub account to a Hasura Cloud project
* Step-2: Edit GitHub Integration​ Click on the Edit Deployment button in the GitHub Deployment section to edit the GitHub repository/branch/directory/deployment mode for the GitHub integration (ex: api/hasura)
* Step-3: View deployment log
* Step-4: view project (launch console log)
```

* Link setup: <https://hasura.io/docs/latest/graphql/cloud/projects/github-integration/>

#### Link

* App Heroku: <https://dashboard.heroku.com/apps/ntsv4a/deploy/heroku-git>
* Host : <https://ntsv4a.herokuapp.com/>
* Hasura Cloud: <https://cloud.hasura.io/project/xxx-xxx-xxx/console/api/api-explorer>

### NodeJS

#### Build

```sh
* Step-1: cd api
* Step-2: npm run build
```

* Note: The build file will be stored in the dist folder

#### Run-up

```sh
cd api
npm i
ENV prod: npm start
ENV dev: npm test
ENV stage: npm stage
```

#### Express v4

This is a starter kit for `nodejs` with `express`. To get started:

Firstly, [download the starter-kit](https://github.com/hasura/codegen-assets/raw/master/nodejs-express/nodejs-express.zip) and `cd` into it.

#### Entry Point

* Open Access

```sh
http://localhost:3000/
```

### IPFS

#### Framework

```sh
ipfs-http-client: 56.0.3
infura
```

#### Data stream

* Client send file -> Server -> IPFS(infura )
* IPFS send cid -> Server send link -> client -> database
