# AirPoll
This app was developed for the [Accenture coding challenge](https://github.com/AccentureChallenge/Code.Now). 
Table of contents:
1. [Architecture](https://github.com/nhe23/AirPoll/blob/main/README.md#architecture)
2. [Application Components](https://github.com/nhe23/AirPoll/blob/main/README.md#application-components)
   * [Frontend](https://github.com/nhe23/AirPoll/blob/main/README.md#frontend)
     * [Airpoll SPA](https://github.com/nhe23/AirPoll/blob/main/README.md#airpoll-spa)
   * [Backend](https://github.com/nhe23/AirPoll/blob/main/README.md#backend)
     * [Database](https://github.com/nhe23/AirPoll/blob/main/README.md#database)
     * [DB-Sync](https://github.com/nhe23/AirPoll/blob/main/README.md#db-sync)
     * [GraphQL-API](https://github.com/nhe23/AirPoll/blob/main/README.md#graphql-api)

## Architecture
The following image illustrates the architecture used to solve the challenge.

![alt text](https://github.com/nhe23/AirPoll/blob/main/AirPoll-Architecture.png "AirPoll Architecture")

## Application Components
## Frontend
### Airpoll SPA (Single Page Application)
The Airpoll Frontend is designed as a SPA. The App was built in Svelte with Typescript integration. [Jest](https://jestjs.io/) and the svelte [testing-libraray](https://testing-library.com/docs/svelte-testing-library/intro/) are used for testing. 
The SPA currently has to pages:

Home (Serves as landing page):

![alt text](https://github.com/nhe23/AirPoll/blob/main/Frontend/doc/Home.png "AirPoll Home")

Dashbaord (display air quality data according to requirements given):

![alt text](https://github.com/nhe23/AirPoll/blob/main/Frontend/doc/Dashboard.png "AirPoll Dashboard")


**Develop locally**

To configure the backend url set the environment variable `GQLBACKEND`. If it is not set the app assumes you have the backend running locally at http://localhost:8080/query.

To start locally install the dependencies...

```bash
cd frontend
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.
If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

To run the tests run:

```bash
npm test
```

**Building and running in production mode**

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in the package.json's `dependencies`.

**Start app using Docker**

Use the checked in [Dockerfile](https://github.com/nhe23/AirPoll/blob/main/Frontend/Dockerfile) to build the image, and then run it. Make sure to forward port 5000 to the container.

---

## Backend
The backend consists of three parts: the database, a GraphQL API and a db-sync service.

### Database
The app uses mongodb as database. To run locally either [install](https://docs.mongodb.com/manual/installation/) it or use the official [docker container](https://hub.docker.com/_/mongo).

### DB-Sync
The DB-Sync service is written in go. The service periodically polls data from the openaq API and updates the database.
To run locally `GO` has to be [installed](https://golang.org/doc/install). The database is configured via the environment variable "mongodb". If not set the 
service assumes you have it running locally ("mongodb://localhost:27017")

To run locally navigate into the directory and run the programm
```bash
cd backend/dbsync
go mod download
go run main.go
```

**Start service using Docker**

Use the checked in [Dockerfile](https://github.com/nhe23/AirPoll/blob/main/Backend/dbsync/Dockerfile) to build the image, and then run it. 

**Run tests**

You can run the unittests like this:
```bash
cd backend/dbsync
make test
```

### GraphQL-API
The GraphQL-API was also written in go. It uses [gqlgen](https://github.com/99designs/gqlgen) for the GraphQL integration. Gqlgen is used to automatically generate 
models and queryresolvers for the given schema. Also [dataloaden](https://github.com/vektah/dataloaden) is used for dataloaders.
To run locally `GO` has to be [installed](https://golang.org/doc/install). The database is configured via the environment variable "mongodb". If not set the 
service assumes you have it running locally ("mongodb://localhost:27017")

To run locally navigate into the directory and run the programm
```bash
cd backend/api
go mod download
go run cmd/server/main.go
```
You can use the GraphQL dashboard by opening http://localhost:8080/ in your browser. There you can run queries and inspect the schema.

**Run tests**

You can run the unittests like this:
```bash
cd backend/dbsync
make test
```

**Start GraphQL-API using Docker**

Alternatively use the checked in [Dockerfile](https://github.com/nhe23/AirPoll/blob/main/Backend/api/Dockerfile) to build the image, and then run it. Make sure to forward port 8080 to the container.

