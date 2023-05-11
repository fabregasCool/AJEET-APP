import express from 'express';
import {
  deleteCat,
  getCats,
  getCat,
  updateCat,
  createCat,
} from '../controllers/CatNational.js';

const router = express.Router();

//Recupérer tous les utilisateurs
router.get('/list', getCats);

//Recupérer tous les utilisateurs
router.post('/create', createCat);

//Recupérer un utilisateur
router.get('/read/:id', getCat);

//Modifier un utilisateur
router.put('/update/:id', updateCat);

//Supprimer un utilisateur
router.delete('/delete/:id', deleteCat);

//NB: En fait le "CreateCat", c'est lui qui est "Register" dans "auth"
//NB: Le middleware indque qu'on doit verifier le Token avant d'effecteur l'action
export default router;
