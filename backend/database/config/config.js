require('dotenv').config()

module.exports = {
    "development": {
      "url": process.env.DEV_DATABASE_URL,
      "dialect": "postgres"
    },
    // "test": {
    //   "url": " ",
    //   "dialect": "postgres"
    // },
    // "production": {
    //   "url": " ",
    //   "dialect": "postgres"
    // }
  }
