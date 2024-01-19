let db = require('../database/index.js');
let { DataTypes } = require('sequelize');

let User = db.define("users",{
    username : {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

async function initializeDatabase() {
    try {
        await db.sync();
        console.log("The table User was Created");
    } catch (error) {
        console.error("Cannot Create Table: " + error);
    }
}
initializeDatabase();

module.exports = User