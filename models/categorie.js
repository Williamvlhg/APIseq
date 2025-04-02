import connection from "../db.js";
import { DataTypes } from "sequelize";


const Categorie = connection.define("categorie", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    codeEAN: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: () => `EAN-${Math.random().toString(36).substr(2, 9)}`, // Génération automatique
    },
});

export default Categorie;