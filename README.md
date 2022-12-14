## Installation

The Server requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd Quindo--Quiz-App
npm i
npm run build
npm run start
```

For production environments...

```sh
NODE_ENV=dev
PORT=5000
AUTHENTICATION_SECRET= [SECRET]
MONGO_URL= [MONGDB_URL_LINK]
```
