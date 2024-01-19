// statusPatient.model.js
const { DataTypes } = require("sequelize");
const db = require("../database");

const StatusPatient = db.define("status_patients", {
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    in_date_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    out_date_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
});

async function initializeDatabase() {
    try {
        await db.sync();
        console.log("The table Status Patient was Created");
    } catch (error) {
        console.error("Cannot Create Table: " + error);
    }
}
initializeDatabase();

module.exports = StatusPatient;
