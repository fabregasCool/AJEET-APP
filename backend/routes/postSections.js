//Represente le Post(Introduction,dev image de la section)

import express from 'express';
import {
  deletePostSection,
  getPostSections,
  getPostSection,
  updatePostSection,
  createPostSection,
  getPostsSectionByCategory,
} from '../controllers/postSection.js';

const router = express.Router();

//Recupérer tous les postSections
router.get('/list', getPostSections);

//Recupérer tous les postSections
router.post('/create', createPostSection);

//Recupérer un postSection
router.get('/read/:id', getPostSection);

//Modifier un postSection
router.put('/update/:id', updatePostSection);

//Supprimer un postSection
router.delete('/delete/:id', deletePostSection);

//Recuperer et afficher les post de sections en fonction des categories
router.get('/ByCategory/:categoryId', getPostsSectionByCategory);

//NB: En fait le "CreatePostSection", c'est lui qui est "Register" dans "auth"
//NB: Le middleware indque qu'on doit verifier le Token avant d'effecteur l'action
export default router;
