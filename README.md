# Nodejs Expressjs MongoDB Ready-to-use API Project Structure

 
REST API Development with Node.js, Express, and MongoDB

## Getting started

It is very useful for building RESTful web APIs for your front-end platforms like Android, iOS, or JavaScript frameworks (Angular, Reactjs, etc.).

This project will run on **NodeJs** using **MongoDB** as database. I maintained the code structure easy as any beginner can also adopt the flow and start building an API. 

## Implemented NestJS with Clean Architecture, TypeScript, and CQRS

- Added CQRS for handling queries and commands.
- Integrated event-driven microservices using message queues.
- Choose Prisma/TypeORM with migrations for code-first database management.
- Simplified complexity by adhering to Clean Architecture principles, ensuring scalability and maintainability.

Simplified architecture by using SOA, avoiding complexity I can work with other architectures

 
## Features

- Basic Authentication (Register/Login with hashed password)
- JWT Tokens, make requests with a token after login with the `Authorization` header with the value `Bearer yourToken` where `yourToken` will be returned in the Login response.
- Pre-defined response structures with proper status codes.
- **Task** example with **CRUD** operations.
- Light-weight project.
- Test cases.
- logging  with [winston]([https://eslint.org/](https://www.npmjs.com/package/winston)).
 

## Software Requirements

- Node.js 
- MongoDB 

## How to install

### Using Git (recommended)

1.  Clone the project from Git Hub. Change "ms-task_managment" to your project name.


### Install npm dependencies after installing (Git or manual download)

```bash
cd ms-task_managment
npm install
```

### Setting up environments

1.  You will find a file named `.env` on the root directory of the project contains MONGO_URI, PORT and JWT_SECRET.


## Project structure

```sh
.
├── index.js
├── package.json
├── Config
│   ├── Database.js
│   ├── logger.js
│   ├── monitoring.js
│   ├── rateLimit.js
│   ├── swaggerConfig.js
├── controllers
│   ├── task.controller.js
│   └── BookController.js
├── models
│   ├── task.model.js
│   └── user.model.js
├── routes
│   ├── api.js
│   ├── auth.js
│   └── book.js
├── middlewares
│   ├── taskRoutes.js
│   ├── userRoutes.js
├── test
│   ├── taskService.test.js
│   ├── userService.test.js
```

## How to run

### Running API server locally 

```bash
npm run start
```

You will know server is running by checking the output of the command `npm run dev`

```bash
Connected to MongoDB: YOUR_DB_CONNECTION_STRING
The app is running ...

Press CTRL + C to stop the process.
```

**Note:** `YOUR_DB_CONNECTION_STRING` will be your MongoDB connection string.
  
## Tests

```bash
npm test
```
##  Run 

```bash
npm run i 
npm start
```
 
##  Run with Docker 

```bash
docker-compose up --build
```
 
## Documention 
-  Swagger Documentation  with [[Swagger](http://localhost:3000/api-docs)]([http://localhost:3000/api-docs)).

## Monitoring 
- using A prometheus client for Node.js that supports histogram, summaries, gauges and counters. Documentation  with [[metrics](http://localhost:3000/metrics)]([http://localhost:3000/metrics)).
