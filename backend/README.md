# Backend

## Project Overview

This is the backend service for the #Stocks, built using Express.js with TypeScript and PostgreSQL as the database. The backend handles all API requests, data processing, and interactions with the database.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/)
- [TypeScript](https://www.typescriptlang.org/#download-links)
- [PostgreSQL](https://www.postgresql.org/download/)

## Installation

### Install Dependencies

Install the necessary dependencies using npm:

    npm install

## Configuration

Create a `.env` file in the root of the backend directory and add the following environment variables:

    NODE_ENV=development

    DB_USERNAME=user
    DB_PASSWORD=pass
    DB_DATABASE=stocksdb
    DB_HOST=127.0.0.1
    DB_DIALECT=postgres

    API_URL=http://localhost:3000

    PORT=3000

## Running the Application

### Start the Application

Start the application:

    npm start

### Import Data

You can add data manually using the backend endpoints, or if you prefer, we have a script that can load this data into your database. Use the following command:

    npm run importData

## API Endpoints

Once the server is running, the API will be accessible at `http://localhost:3000`. You can interact with the API using your preferred API client or via frontend calls.

## API Documentation

The backend service includes a Swagger/OpenAPI documentation file to help you understand and interact with the API. You can view the API documentation locally using a Swagger UI tool.

### Viewing the API Documentation Locally

1.  Install Swagger UI:

    - You can use the [Swagger Editor](https://editor.swagger.io) online tool and upload the `api-documentation.yaml` file.
    - Alternatively, you can use a local Swagger UI instance. Follow the instructions on the Swagger UI GitHub repository to set it up.

2.  Open the `api-documentation.yaml` file located in the `root` directory:

        backend/
            └── api-documentation.yaml     # API documentation file

    ### Example API Endpoints Documented

- **`GET /securities`**: Retrieve a list of all securities. Optional query parameter `simple` returns a simplified version of the securities.
- **`POST /securities`**: Create a new security.
- **`POST /securities/{securityId}/prices`**: Add prices for a specific security.
- **`GET /securities/{id}`**: Retrieve a specific security by ID.
