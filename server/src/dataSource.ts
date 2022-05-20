import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: 'src/db/database.sqlite',
  entities: ['src/entities/*.ts'],
  migrations: ['src/db/migrations/*.ts'],
});
