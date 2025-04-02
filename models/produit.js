import connection from "../db.js";
import { DataTypes } from "sequelize";
import Categorie from "./categorie.js";

const Produit = connection.define("produit", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    prix: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 10,
            max: 500,
        },
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    categorieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categorie,
            key: "id",
        },
    },
});

// Définir les relations
Categorie.hasMany(Produit, {
    foreignKey: "categorieId",
    onDelete: "RESTRICT", // Empêche la suppression si des produits existent
});
Produit.belongsTo(Categorie, {
    foreignKey: "categorieId",
});

export default Produit;