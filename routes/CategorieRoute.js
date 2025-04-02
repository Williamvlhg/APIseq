import { Router } from 'express';
import { getCategories, getCategorieById, createCategorie, updateCategorie, deleteCategorie } from '../controllers/CategorieController.js';
const route = Router();
route.get('/', getCategories);
route.get('/:id', getCategorieById);
route.post('/', createCategorie);
route.put('/:id', updateCategorie);
route.delete('/:id', deleteCategorie);
export default route;