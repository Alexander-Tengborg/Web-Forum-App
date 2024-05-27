# Web-Forum-App

A REST API for a Forum written in Typescript using PostgreSQL and Docker.

Written for a challenge by [zylyty](https://zylyty.com/)

## Needed environment variables:
```
ADMIN_API_KEY=
API_LISTENING_PORT=
DB_HOST=
DB_PORT=
DB_NAME=
DB_USERNAME=
DB_PASSWORD=
```

## Optional environment variables:
```
SESSION_SECRET=
```

## Commands
Install all dependencies by running
```
npm install
```

Then run the API with nodemon by running
```
npm run dev
```

The API can also be built then ran with node by running the following commands
```
npm run build
npm run start
```
