import Sequelize from "sequelize";
import { dbInstance } from "../config/db.js";

const TypeProduct = dbInstance.define(
    "typeProduct" /* table name */,
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }
);

export { TypeProduct };

