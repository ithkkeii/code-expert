import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  // host: 'localhost',
  port: 5432,
  username: 'postgres',
  // password: '12345678',
  password: process.env.POSTGRES_PASSWORD,
  // database: 'question_service',
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  logging: 'all',
  synchronize: false,
} as TypeOrmModuleOptions;
