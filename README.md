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
### Docker
First build the Docker container using the command
```
docker build -t web-forum-app .
```
**web-forum-app** specifies the name of the container, any non-capital name can be used.

The Docker container can then be started with the following command
```
docker run -it -p 80:8080 web-forum-app
```
Replace **web-forum-app** with the name of your container that you chose when building the container.

The node server runs on port 8080, but with this command it will be mapped to port 80 on your computer, meaning that you can access the server at [localhost:80](http://localhost:80) if you are running it locally. You can use any other port by replacing **-p 80:8080** with **-p PORT:8080** where **PORT** is your desired port.

### Running without Docker
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
