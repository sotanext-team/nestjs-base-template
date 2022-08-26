export default () => ({
  server: {
    port: parseInt(process.env.PORT, 10) || 3000,
    appEnv: process.env.APP_ENV,
  },
  database: {
    uri: process.env.DB_URI,
    name: process.env.DB_NAME,
  },
});
