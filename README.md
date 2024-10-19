# Nodejs Expressjs MongoDB API Project Structure

 
REST API Development with Node.js, Express, and MongoDB

## Getting started

This is a basic API  written in JavaScript. It is APIs for your front-end platforms like Android, iOS, or JavaScript frameworks (Angular, Reactjs, etc.).

This project will run on **NodeJs** using **MongoDB** as a database. I maintained the code structure easily as any beginner can also adopt the flow and start building an API. 

## Note 
Simplified SOA Architecture
In this project, I followed the Service-Oriented Architecture (SOA) model while simplifying the architecture to align with the requirements of the Assignment_NodeJS task. Despite the simplifications, I leveraged my extensive experience with NestJS, Clean Architecture, TypeScript, and CQRS to ensure the application maintains a solid structure, scalability, and maintainability.


## Simplified SOA:
- I implemented SOA to simplify the architecture, meeting assignment requirements, but can work with more complex architectures when needed.




## Strong Experience and Expertise

>  I have extensive experience in building enterprise-grade applications using the following technologies and architectural patterns:

### 1. **NestJS**
   - Expertise in developing scalable, maintainable, and robust back-end applications using **NestJS**, a framework built on top of **Node.js** and **Express**.
   - Deep understanding of dependency injection, module-based architecture, and building highly decoupled and testable systems.

### 2. **TypeScript**
   - Proficient in building applications with **TypeScript**, leveraging its strong typing system to catch errors early and improve code reliability.
   - Expertise in creating modular and reusable code with **TypeScript**'s interfaces, classes, generics, and advanced type system.
   - Experience in using TypeScript in both backend services (Node.js) and frontend applications (React/Angular).

### 3. **Clean Architecture**
   - Strong experience in implementing **Clean Architecture** principles to ensure clear separation between application layers.
   - Focus on keeping the business logic (use cases) independent from external concerns such as databases, APIs, and frameworks.
   - This allows the system to be easily maintainable, scalable, and testable, improving overall code quality.

### 4. **CQRS (Command Query Responsibility Segregation)**
   - Proficient in designing systems using **CQRS** to separate the handling of commands (write operations) from queries (read operations).
   - This pattern improves system performance, scalability, and simplicity in handling complex domain logic.
   - Applied **CQRS** to manage both synchronous and asynchronous flows efficiently.

### 5. **Event-Driven Microservices**
   - Extensive experience in building **event-driven microservices** using **message queues** for inter-service communication.
   - Expertise in handling **asynchronous processing**, improving system resilience, and ensuring eventual consistency in distributed systems.

### 6. **Prisma/TypeORM with Code-First Migrations**
   - Strong experience with both **Prisma** and **TypeORM** as **ORM** tools for managing databases in a code-first manner.
   - Proficient in writing migrations and managing schema evolution through these tools to keep the database aligned with application changes.
   - Applied best practices for maintaining **database consistency** and ensuring seamless schema updates.

### 7. **Monorepos with NX Workspace**
   - Expertise in managing **monorepos** using **NX Workspace**, organizing multiple projects under a single repository.
   - Leveraged the benefits of code sharing, dependency management, and continuous integration across services in the same workspace.

### 8. **CI/CD and Docker Containerization**
   - Extensive experience setting up **CI/CD pipelines** for automated deployment using tools like **GitHub Actions**, **Jenkins**, and **GitLab CI**.
   - Expertise in **Docker containerization** for isolating and deploying applications in any environment.
   - Experience integrating **Cloud pipelines** for seamless deployment to cloud services like AWS, Azure, and GCP.

### 9. **Redis Cache**
   - Proficient in integrating **Redis Cache** for optimizing application performance, caching frequently accessed data, and reducing database load.
   - Expertise in configuring Redis for both in-memory caching and distributed caching in scalable environments.

### 10. **Automation Testing**
   - Strong experience in implementing various types of automated testing, including:
     - **Unit tests** for testing individual components.
     - **E2E (End-to-End) tests** for simulating real user scenarios.
     - **Integration tests** for testing the interaction between components.
     - **Load tests** for ensuring application stability under high traffic.
   - Proficiency in testing frameworks such as **Jest**, **Mocha**, **Cypress**, and **K6** for performance testing.

### 11. **ESLint**
   - Implemented **ESLint** for enforcing coding standards and best practices, ensuring consistent code quality across the project.
   - Set up custom ESLint configurations to maintain code readability and detect potential errors early during the development phase.

---

This combination of **NestJS**, **TypeScript**, **Clean Architecture**, **CQRS**, **event-driven microservices**, **CI/CD pipelines**, **Docker containerization**, **Redis caching**, and **automation testing** allows me to deliver robust, scalable, and maintainable solutions with high performance and reliability.


## Advertise for Job/Work Contract

I am open to a good job or work contract. You can contact me directly my email ([elsawy269@gmail.com](mailto:elsawy269@gmail.com "elsawy269@gmail.com"))

 
## Features

- Basic Authentication (Register/Login with hashed password)
- JWT Tokens, make requests with a token after login with the `Authorization` header with the value `Bearer yourToken` where `yourToken` will be returned in the Login response.
- Pre-defined response structures with proper status codes.
- **Task** example with **CRUD** operations.
- Light-weight project.
- Test cases.
- Logging  with [winston]([https://eslint.org/](https://www.npmjs.com/package/winston)).
- Swagger documention 
- Caching
- Monitoring (Prometheus client)
 

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

**Note:** `YOUR_DB_CONNECTION_STRING` will be your MongoDB connection string.
  
## Tests

```bash
npm test
```
 
##  Run with Docker 

```bash
docker-compose up --build
```
 
## Documention 
-  Swagger Documentation  with [[Swagger](http://localhost:3000/api-docs)]([http://localhost:3000/api-docs)).

## Monitoring 
- using A Prometheus client for Node.js that supports histograms, summaries, gauges, and counters. Documentation  with [[metrics](http://localhost:3000/metrics)]([http://localhost:3000/metrics)).

## Caching 
- Using node-cache for in-memory caching, tasks can be retrieved by ID from the cache, and the cache is cleared when tasks are updated
