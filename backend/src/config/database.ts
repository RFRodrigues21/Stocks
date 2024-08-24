import { Sequelize } from 'sequelize-typescript';
import config from './config';
import { Security } from '../models/security.model';
import { Price } from '../models/price.model';

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  models: [Security, Price]
});

export default sequelize;
