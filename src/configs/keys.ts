require("dotenv").config();

export default {
  dbURI: process.env.DATABASE_URL,
  port: 3000,
};
