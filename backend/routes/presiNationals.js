import express from 'express';
import {
  deletePresiNational,
  getPresiNationals,
  getPresiNational,
  updatePresiNational,
  createPresiNational,
  getPresiNationalByCategoryWhithPresiNationalId,
} from '../controllers/presiNational.js';

const router = express.Router();

//Recupérer tous les utilisateurs
router.get('/list', getPresiNationals);

//Créeer
router.post('/create', createPresiNational);

//Recupérer un utilisateur
router.get('/read/:id', getPresiNational);

//Modifier un utilisateur
router.put('/update/:id', updatePresiNational);

//Supprimer un utilisateur
router.delete('/delete/:id', deletePresiNational);

//Recuperer et afficher les présidents de sections (mais ici on a plus besoin de recupérer l'id de la categorie mais plutot on passé par l'id du président qui se trouve dans l'url)
router.get(
  '/ByCategoryWhithPresiNationalId/:preseiNationalId',
  getPresiNationalByCategoryWhithPresiNationalId
);

//NB: En fait le "CreatePresiNational", c'est lui qui est "Register" dans "auth"
//NB: Le middleware indque qu'on doit verifier le Token avant d'effecteur l'action
export default router;
