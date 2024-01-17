import db from "../config/database.js";
import { DataTypes } from "sequelize";

const User = db.define("User",{
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
    },
})

try {
    await db.sync();
    console.log("The table User was Created")
} catch (error) {
    console.error("Cannot Create Table: "+error)
}

export default User