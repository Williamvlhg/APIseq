import Produit from "../models/produit.js";
import Categorie from "../models/categorie.js";

export const getProduits = async (req, res) => {
    try {
        const produits = await Produit.findAll({
            include: { model: Categorie, attributes: ["nom", "codeEAN"] }, 
        });
        if (produits.length === 0) {
            return res.status(404).json({ message: "Aucun produit trouvé" });
        }
        res.status(200).json(produits);
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
    }
};

export const getProduitById = async (req, res) => {
    try {
        const produit = await Produit.findByPk(req.params.id, {
            include: { model: Categorie, attributes: ["nom", "codeEAN"] }, 
        });
        if (!produit) {
            return res.status(404).json({ message: "Produit introuvable" });
        }
        res.status(200).json(produit);
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
    }
};

export const createProduit = async (req, res) => {
    try {
        const { nom, description, prix, stock, categorieId } = req.body;

        // Vérifier si la catégorie existe
        const categorie = await Categorie.findByPk(categorieId);
        if (!categorie) {
            return res.status(400).json({ message: "Catégorie invalide" });
        }

        const produit = await Produit.create({ nom, description, prix, stock, categorieId });
        res.status(201).json(produit);
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({ message: "Erreur de validation", errors: error.errors });
        }
        res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
    }
};

export const updateProduit = async (req, res) => {
    try {
        const { nom, description, prix, stock, categorieId } = req.body;

        // Vérifier si la catégorie existe
        if (categorieId) {
            const categorie = await Categorie.findByPk(categorieId);
            if (!categorie) {
                return res.status(400).json({ message: "Catégorie invalide" });
            }
        }

        const [updated] = await Produit.update(
            { nom, description, prix, stock, categorieId },
            { where: { id: req.params.id } }
        );
        if (!updated) {
            return res.status(404).json({ message: "Produit introuvable" });
        }
        res.status(200).json({ message: "Produit mis à jour avec succès" });
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({ message: "Erreur de validation", errors: error.errors });
        }
        res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
    }
};

export const deleteProduit = async (req, res) => {
    try {
        const deleted = await Produit.destroy({
            where: { id: req.params.id },
        });
        if (!deleted) {
            return res.status(404).json({ message: "Produit introuvable" });
        }
        res.status(200).json({ message: "Produit supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
    }
};

export const getNombreProduitsParCategorie = async (req, res) => {
    try {
        const produits = await Produit.findAll({
            attributes: [
                "categorieId",
                [connection.fn("COUNT", connection.col("id")), "nombreProduits"],
            ],
            group: ["categorieId"],
        });

        res.status(200).json(produits);
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
    }
};

