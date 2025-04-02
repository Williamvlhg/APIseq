import { Router } from 'express';
import { getProduits, getProduitById, createProduit, updateProduit, deleteProduit } from '../controllers/ProduitController.js';
const route = Router();
route.get('/', getProduits);
route.get('/:id', getProduitById);
route.post('/', createProduit);
route.put('/:id', updateProduit);
route.delete('/:id', deleteProduit);
export default route;