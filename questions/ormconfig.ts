import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  logging: 'all',
  synchronize: false,
} as TypeOrmModuleOptions;
