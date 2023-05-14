//Histoire de l'ajeet Nationale
import express from 'express';
import {
  deletePost,
  getPosts,
  getPost,
  updatePost,
  createPost,
} from '../controllers/postAjeetNtle.js';

const router = express.Router();

//Recupérer tous les utilisateurs
router.get('/list', getPosts);

//Recupérer tous les utilisateurs
router.post('/create', createPost);

//Recupérer un utilisateur
router.get('/read/:id', getPost);

//Modifier un utilisateur
router.put('/update/:id', updatePost);

//Supprimer un utilisateur
router.delete('/delete/:id', deletePost);

export default router;
