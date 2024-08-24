# Stocks

## Project Overview

This project is composed of a frontend and backend, managed via Docker Compose for ease of deployment and development. The frontend is built with React.js, and the backend is powered by a Node.js/Typescript.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Quick Start

### Clone the Repository

First, clone the repository and navigate into the project directory:

    git clone https://github.com/RFRodrigues21/Stocks.git
    cd Stocks

## Running the Application

To run the entire application using Docker Compose, execute the following command:

    docker-compose up --build

### Import Data

To import data into your database, follow these steps:

1.  **Navigate to the backend directory**:

    Open your terminal and change to the `/backend` directory of your project:

    cd backend

2.  Run the import script:

    Use the following command to run the data import script:

        npm install
        	npm run importData

### Accessing the Application

Once the services are up and running, you can access them via the following URLs:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:3001`

## Further Documentation

For more detailed instructions and information specific to the frontend and backend, please refer to the respective README files:

- [Frontend Documentation](frontend/README.md)
- [Backend Documentation](backend/README.md)
