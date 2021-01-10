export default {
  dbUrl: process.env.DB_URL,
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  logDir: process.env.LOG_DIR || 'logs',
};
