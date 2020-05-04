module.exports = [
  {
    name: 'production',
    type: 'postgres',
    host: process.env.TYPEORM_HOST || 'localhost',
    username: process.env.TYPEORM_USERNAME || 'postgres',
    password: process.env.TYPEORM_PASSWORD || 'docker',
    database: process.env.TYPEORM_DATABASE || 'finances-prod',
    synchronize: true,
    dropSchema: false,
    logging: false,
    entities: [
      'dist/src/infra/db/entities/**/*.js'
    ],
    migrations: [
      'dist/src/migration/**/*.js'
    ],
    subscribers: [
      'dist/src/subscriber/**/*.js'
    ],
    cli: {
      entitiesDir: 'dist/src/infra/db/entities',
      migrationsDir: 'dist/src/migration',
      subscribersDir: 'dist/src/subscriber'
    }
  },
  {
    name: 'development',
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'finances-dev',
    synchronize: true,
    dropSchema: false,
    logging: true,
    entities: [
      'src/infra/db/entities/**/*.ts'
    ],
    migrations: [
      'src/migration/**/*.ts'
    ],
    subscribers: [
      'src/subscriber/**/*.ts'
    ],
    cli: {
      entitiesDir: 'src/infra/db/entities',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber'
    }
  },
  {
    name: 'tests',
    type: 'sqlite',
    database: './tests.sqlite',
    synchronize: true,
    logging: true,
    entities: [
      'src/infra/db/entities/**/*.ts'
    ],
    migrations: [
      'src/migration/**/*.ts'
    ],
    subscribers: [
      'src/subscriber/**/*.ts'
    ],
    cli: {
      entitiesDir: 'src/infra/db/entities',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber'
    }
  }
]
