/**
 * this file will configure the setting of orm migration
 */
let pathSrc = '.'; //run nest start
if (!process.env.DB_CONNECTION) {
  require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
  pathSrc = 'src';
}
module.exports = {
  type: process.env.DB_CONNECTION || 'mongodb',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 27017,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'fizenpay-event-consumer',
  authSource: 'admin',
  autoLoadEntities: true,
  entities: [__dirname + '/**/*.entity{ .ts,.js}'],
  subscribers: [__dirname + '/**/*.subscriber{ .ts,.js}'],
  synchronize: false,
  reconnectTries: 300,
  // migrations: [pathSrc + '/database/migrations/*{.ts,.js}'],
  // factories: [pathSrc + '/database/factories/*.factory{.ts,.js}'],
  // seeds: [pathSrc + '/database/seeders/*.seed{.ts,.js}'],
  cli: {
    entitiesDir: pathSrc + '/',
    subscribersDir: pathSrc + '/',
    migrationsDir: pathSrc + '/database/migrations',
  },
};
