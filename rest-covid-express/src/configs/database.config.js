// import dotenv
const dotenv = require("dotenv");
dotenv.config();

// destructuring object dotenv
const {
    DB_HOST,
    DB_DATABASE,
    DB_PASSWORD,
    DB_USER,
    DB_DIALECT
} = process.env;

// define database
const db = {
    HOST: DB_HOST,
    USER: DB_USER,
    PASSWORD: DB_PASSWORD,
    DB: DB_DATABASE,
    DIALECT: DB_DIALECT,
};

// export db
module.exports = db;