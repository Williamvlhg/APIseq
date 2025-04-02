import Categorie from "../models/categorie.js";
import Produit from "../models/produit.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await Categorie.findAll();
        if (categories.length === 0) {
            return res.status(404).json({ message: "Aucune catégorie trouvée" });
        }
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
    }
};

export const getCategorieById = async (req, res) => {
    try {
        const categorie = await Categorie.findByPk(req.params.id);
        if (!categorie) {
            return res.status(404).json({ message: "Catégorie introuvable" });
        }
        // Inclure les produits associés à la catégorie (bonus)
        const produits = await Produit.findAll({
            where: { categorieId: req.params.id },
        });
        if (produits.length === 0) {
            res.status(200).json(categorie);
        } else {
            res.status(200).json({ categorie, produits });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
    }
};

export const createCategorie = async (req, res) => {
    try {
        const { nom, description } = req.body;
        const categorie = await Categorie.create({ nom, description });
        res.status(201).json(categorie);
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({ message: "Erreur de validation", errors: error.errors });
        }
        res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
    }
};

export const updateCategorie = async (req, res) => {
    try {
        const { nom, description } = req.body;
        const [updated] = await Categorie.update(
            { nom, description },
            { where: { id: req.params.id } }
        );
        if (!updated) {
            return res.status(404).json({ message: "Catégorie introuvable" });
        }
        res.status(200).json({ message: "Catégorie mise à jour avec succès" });
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({ message: "Erreur de validation", errors: error.errors });
        }
        res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
    }
};

export const deleteCategorie = async (req, res) => {
    try {
        // Vérifier si des produits sont liés à cette catégorie
        const produits = await Produit.findOne({ where: { categorieId: req.params.id } });
        if (produits) {
            return res.status(400).json({ message: "Impossible de supprimer une catégorie contenant des produits" });
        }

        const deleted = await Categorie.destroy({
            where: { id: req.params.id },
        });
        if (!deleted) {
            return res.status(404).json({ message: "Catégorie introuvable" });
        }
        res.status(200).json({ message: "Catégorie supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
    }
};