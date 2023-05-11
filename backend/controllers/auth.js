import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';

//S'enregistrer (Créer un nouvel utilisateur)
export const register = async (req, res, next) => {
  try {
    //Cryptage du mot de passe écrit par l'utilisateur
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    //Création de l'utilisateur
    const newUser = new User({ ...req.body, password: hash });

    //...est l'outil de propagation; cette ligne signifie qu'on separe les autres infos du password
    //Comme le password est crypté; on envoie sa version cryptée(hsah) à la base de données

    await newUser.save(); //Enregistrement du nouvel utilisateur

    res.status(200).send('User has been created');
  } catch (err) {
    console.log(err); //Affiche l'erreur dans la Terminal
    next(err);
  }
};

//Se connecter
export const login = async (req, res, next) => {
  //req.body contient les valeurs envoyées à la base de donnée via l'api
  try {
    //On vérifie si le nom saisi existe de la base de donnée
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return next(createError(404, 'Nom Utilisateur erroné ou inexistant'));

    //On compare le mot de passe saisi et celui(crypté) de la BDD
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, 'Mot de Passe Incorrect '));

    //Quand le nom et le mot de passe sont correctes

    //SI MOT DE PASSE ET USERNAME CORRECT, on va se connecter
    //Mais d'abord on crée un jeton d'accès pour crypter ses infos(ici ce sera l'id utilisateur) pour plus de sécurité
    //id: user._id === on met user._id car dans MongoDB? l'identifiant est "_id" et non "id"

    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...others } = user._doc; //(...) Separe le mot de passe des autres informations utilisateurs
    //user._doc au lieu de user pour éliminer des infos sur l'utilisateur qui ne sont pas utiles

    // res.status(201).send({ others, token });Le token est renvoyé avec les autres information dans local storage

    //On va renvoyer ces informations (token) mais directement dans les Cookies du Navigateur. "access_token" est le nom de ce cookie
    res
      .cookie('access_token', token, {
        // maxAge: 1000 * 60 * 60,
        // sameSite: "none",
        // secure: true,
        httpOnly: true,
      })
      .status(200)
      .json(others);

    //On renvoie les infos à l'utilsateur son token mais pas le mot de passe
  } catch (err) {
    next(err);
  }
};

//Se Deconnecter

export const logout = (req, res) => {
  res.cookie('access_token', 'none', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });
  res.status(200).json('User has been logged out.');
};

// L'attribut samSite vous permet de déclarer si vos cookies doivent être restreints
//au site visité, à des tiers, ou à des sous-domaines du site actuel.

//None requiert l'attribut Secure dans les dernières versions des navigateurs les plus récents

//On peut décider d'afficher des messages personnels et non ceux par defaut
//Pour ce faire, on va utiliser un middleware dans "index.js" qui va gérer ses messages d'erreurs
