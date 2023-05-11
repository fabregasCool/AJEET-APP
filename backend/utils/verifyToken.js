//Permet de verifier le jsonwebtoken s'il est bon

import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; //Récupération du token
  if (!token) return next(createError(401, "Vous n'êtes pas authentifié")); //On affiche ce message s'il ne trouve pas de Token

  //Même si il trouve un token, on verifie s'il est valide
  jwt.verify(token, process.env.JWT, (err, userInfo) => {
    if (err) return next(createError(403, "Token is not valid"));

    //Si le token est valide, on peut se connecter
    req.user = userInfo;
    next(); //Ensuite on continue avec la suite de l'application
    //userInfo: Toutes Les informations sur l'utilisateur
  });
};
