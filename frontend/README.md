# Frontend

## Project Overview

This is the frontend service for the #Stocks, built using React.js. The frontend application provides the user interface and interacts with the backend service .

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)

## Installation

### Install Dependencies

Install the necessary dependencies using npm:

    npm install

## Running the Application

### Start the Application

To start the application in development mode, use the following command:
npm start

## API Interaction

The frontend interacts with the backend API, which is accessible at `http://localhost:3001`. Make sure the backend service is running for the frontend to function correctly.

## Features

- **Table with Securities**: Displays all securities in a sortable table.
- **Search Bar**: Allows filtering of securities data.
- **Metrics Panels**: Displays the following metrics above the table:
  - Average Trends
  - Top Stock Country
  - Highest Stock Trend
  - Lowest Stock Trend
- **Security Details**: Clicking on a row in the table shows detailed information about the security, including a chart and additional metrics such as Highest and Lowest Stock and Highest and Lowest Volume.
- **Dark/Light Mode Toggle**: A button in the top right corner of the app's top bar to switch between dark and light modes.
