// patient.model.js
const { DataTypes } = require("sequelize");
const db = require("../database");
const StatusPatient = require("./statusPatient.model");

const Patient = db.define("patients", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Patient.hasOne(StatusPatient, {
    foreignKey: "id", 
    onDelete: "CASCADE",
});

StatusPatient.belongsTo(Patient, {
    foreignKey: "id", 
});

async function initializeDatabase() {
    try {
        await db.sync();
        console.log("The table Patient was Created");
    } catch (error) {
        console.error("Cannot Create Table: " + error);
    }
}
initializeDatabase();

module.exports = Patient;