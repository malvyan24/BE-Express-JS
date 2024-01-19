// import sequelize dan module db
const { Sequelize } = require("sequelize")
const db = require("../configs/database.config");

// buat koneksi database
const db_connect = new Sequelize(db.DB, db.USER, db.PASSWORD, {
    host: db.HOST,
    dialect: db.DIALECT
});

// export module db_connect
module.exports = db_connect;