import { Router } from 'express';
import { getCategorieMin5Produits, getMoyennePrixParCategorie, getNomCategoriePrixMoyen100, getNombreProduitsParCategorie, getProduitsRuptureStock } from '../controllers/RequeteController.js';
const route = Router();


// Route pour récupérer les catégories avec au moins 5 produits
route.get('/categorie-min-5-produits', getCategorieMin5Produits);

// Route pour récupérer la moyenne des prix par catégorie
route.get('/moyenne-prix-par-categorie', getMoyennePrixParCategorie);

// Route pour récupérer les catégories avec un prix moyen supérieur à 100
route.get('/nom-categorie-prix-moyen-100', getNomCategoriePrixMoyen100);

// Route pour récupérer le nombre de produits par catégorie
route.get('/nombre-produits-par-categorie', getNombreProduitsParCategorie);

// Route pour récupérer les produits en rupture de stock
route.get('/produits-rupture-stock', getProduitsRuptureStock);





export default route;