import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const isProduction = process.env.NODE_ENV === 'production';

const configSeed: ConnectionOptions = {
  type: 'postgres',
  host: process.env.PG_HOST || 'localhost',
  port: Number(process.env.PG_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'taxi_crm',
  synchronize: false,
  logging: false,
  entities: [isProduction ? 'dist/orm/entities/**/*.js' : 'src/orm/entities/**/*.ts'],
  migrations: [isProduction ? 'dist/orm/seeds/**/*.js' : 'src/orm/seeds/**/*.ts'],
  cli: {
    migrationsDir: 'src/orm/seeds',
  },
  namingStrategy: new SnakeNamingStrategy(),
};

export = configSeed;
