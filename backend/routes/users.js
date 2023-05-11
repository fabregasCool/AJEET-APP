import express from "express";
import {
  deleteUser,
  getUsers,
  getUser,
  updateUser,
} from "../controllers/user.js";
// import { verifyToken } from "../utils/verifytoken.js";

const router = express.Router();

//Recupérer tous les utilisateurs
router.get("/list", getUsers);

//Recupérer un utilisateur
router.get("/read/:id", getUser);

//Modifier un utilisateur
router.put("/update/:id", updateUser);

//Supprimer un utilisateur
router.delete("/delete/:id", deleteUser);

//NB: En fait le "CreateUser", c'est lui qui est "Register" dans "auth"
//NB: Le middleware indque qu'on doit verifier le Token avant d'effecteur l'action
export default router;
