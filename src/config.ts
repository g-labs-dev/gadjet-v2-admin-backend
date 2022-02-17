import dotenv from 'dotenv';
dotenv.config();

const config = {
  env: process.env.NODE_ENV,
  sequelize: {
    development: {
      database: process.env.DB,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      dialect: process.env.DB_DIALECT,
      host: process.env.DB_HOST,
      pool: { min: 0, max: 20, idle: 5000 },
      timezone: '+09:00',
      logging: (log: string): void => {
        console.log('\n', log);
      },
    },
    production: {
      database: process.env.DB,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      dialect: process.env.DB_DIALECT,
      dialectOptions: {
        socketPath: `/cloudsql/${process.env.DB_SQL_INSTANCE}`,
      },
      pool: { min: 0, max: 20, idle: 5000 },
      timezone: '+09:00',
      logging: false,
    },
  },
};

export default config;
