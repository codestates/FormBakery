const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "0000",
    database: process.env.DB_DATABASE || "development",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
    timezone: "+09:00",
  },
  test: {
    username: process.env.DB_HOST || "root",
    password: process.env.DB_HOST || "0000",
    database: process.env.DB_HOST || "database_test",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    timezone: "+09:00",
  },
  production: {
    username: process.env.DB_USER || "root",
    password: process.env.PASSWORD || "0000",
    database: process.env.DB_DATABASE || "database_production",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    timezone: "+09:00",
  },
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  },
};
