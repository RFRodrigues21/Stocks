// src/config/config.ts
import { Dialect } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const environment = process.env.NODE_ENV  || "development";

interface Config {
  [key: string]: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
  };
}

const config: Config = {
  development: {
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "",
    host: process.env.DB_HOST || "",
    dialect: process.env.DB_DIALECT as Dialect
  }
};

export default config[environment];
