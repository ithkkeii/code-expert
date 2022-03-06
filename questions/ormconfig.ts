import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  // host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  // password: '12345678',
  database: process.env.POSTGRES_DB,
  // database: 'questions_service',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  logging: 'all',
  synchronize: process.env.NODE_ENV === 'development',
  migrationsRun: true,
} as TypeOrmModuleOptions;
