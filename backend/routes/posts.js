import express from 'express';
import {
  deletePost,
  getPosts,
  getPost,
  updatePost,
  createPost,
} from '../controllers/post.js';

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

//NB: En fait le "CreatePost", c'est lui qui est "Register" dans "auth"
//NB: Le middleware indque qu'on doit verifier le Token avant d'effecteur l'action
export default router;
