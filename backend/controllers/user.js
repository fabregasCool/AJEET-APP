import bcrypt from "bcryptjs";

import User from "../models/User.js";

//Recupérer tous les utilisateurs
export const getUsers = async (req, res, next) => {
  try {
    const user = await User.find().sort("-updatedAt");
    res.status(200).json(user);
  } catch (err) {
    next(err);
    // res.status(501).json(err);
  }
};

//Recupérer un utilisateur
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
    // res.status(501).json(err);
  }
};

//Modifier un utilisateur
export const updateUser = async (req, res, next) => {
  try {
    //Cryptage du mot de passe écrit par l'utilisateur
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const userId = req.params.id;
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: { ...req.body, password: hash },
      },
      { new: true } //Permet d'afficher les nouvelles valeurs
    );
    res.status(200).json(updateUser.id + "Modification réussie");
  } catch (err) {
    next(err);
    // res.status(501).json(err);
  }
};

//Supprimer un utilisateur
export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
    res.status(501).json(err);
  }
};
