import express from 'express';
import {
  deletePresiSection,
  getPresiSections,
  getPresiSection,
  updatePresiSection,
  createPresiSection,
  getPresiSectionByCategory,
  getPresiSectionByCategoryWhithPresiSectionId,
} from '../controllers/presiSection.js';

const router = express.Router();

//Recupérer tous les utilisateurs
router.get('/list', getPresiSections);

//Créeer
router.post('/create', createPresiSection);

//Recupérer un utilisateur
router.get('/read/:id', getPresiSection);

//Modifier un utilisateur
router.put('/update/:id', updatePresiSection);

//Supprimer un utilisateur
router.delete('/delete/:id', deletePresiSection);

//Recuperer et afficher les présidents de sections en fonction des categories
router.get('/ByCategory/:categoryId', getPresiSectionByCategory);

//Recuperer et afficher les présidents de sections (mais ici on a plus besoin de recupérer l'id de la categorie mais plutot on passé par l'id du président qui se trouve dans l'url)
router.get(
  '/ByCategoryWhithPresiSectionId/:preseiSectionId',
  getPresiSectionByCategoryWhithPresiSectionId
);

//NB: En fait le "CreatePresiSection", c'est lui qui est "Register" dans "auth"
//NB: Le middleware indque qu'on doit verifier le Token avant d'effecteur l'action
export default router;
