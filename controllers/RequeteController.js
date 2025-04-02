import Produit from "../models/produit.js";
import connection from "../db.js";
import Categorie from "../models/categorie.js";

export const getNombreProduitsParCategorie = async (req, res) => {
    try {
        const produits = await Produit.findAll({
            attributes: [
                "categorieId",
                [connection.fn("COUNT", connection.col("id")), "nombreProduits"],
            ],
            group: ["categorieId"],
            include: {
                model: Categorie,
                attributes: ["nom"], 
            },
        });

        if (produits.length === 0) {
            return res.status(404).json({ message: "Aucune catégorie avec des produits trouvée." });
        }

        res.status(200).json(produits);
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
    }
};

export const getCategorieMin5Produits = async (req, res) => {
    try {
        const categories = await Categorie.findAll({
            attributes: [
                "id",
                "nom",
                [connection.fn("COUNT", connection.col("produits.id")), "nombreProduits"],
            ],
            include: {
                model: Produit,
                attributes: [],
            },
            group: ["categorie.id"],
            having: connection.literal("COUNT(produits.id) >= 5"),
        });

        if (categories.length === 0) {
            return res.status(404).json({ message: "Aucune catégorie avec au moins 5 produits trouvée." });
        }

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
    }
};

export const getMoyennePrixParCategorie = async (req, res) => {
    try {
        const categories = await Categorie.findAll({
            attributes: [
                "id",
                "nom",
                [connection.fn("AVG", connection.col("produits.prix")), "moyennePrix"],
            ],
            include: {
                model: Produit,
                attributes: [],
            },
            group: ["categorie.id"],
        });

        if (categories.length === 0) {
            return res.status(404).json({ message: "Aucune catégorie avec des produits trouvée." });
        }

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
    }
};

export const getNomCategoriePrixMoyen100 = async (req, res) => {
    try {
        const categories = await Categorie.findAll({
            attributes: [
                "id",
                "nom",
                [connection.fn("AVG", connection.col("produits.prix")), "moyennePrix"],
            ],
            include: {
                model: Produit,
                attributes: [],
            },
            group: ["categorie.id"],
            having: connection.literal("AVG(produits.prix) > 100"), // Vérifie les catégories avec un prix moyen > 100
        });

        if (categories.length === 0) {
            return res.status(404).json({ message: "Aucune catégorie avec un prix moyen supérieur à 100 trouvée." });
        }

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
    }
};

export const getProduitsRuptureStock = async (req, res) => {
    try {
        const produits = await Produit.findAll({
            where: {
                stock: 0, 
            },
            include: {
                model: Categorie,
                attributes: ["nom"], 
            },
        });

        if (produits.length === 0) {
            return res.status(404).json({ message: "Aucun produit en rupture de stock trouvé." });
        }

        res.status(200).json(produits);
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
    }
};

