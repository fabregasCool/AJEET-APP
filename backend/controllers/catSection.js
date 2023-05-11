import Cat from '../models/CatSection.js';

//Recupérer tous les utilisateurs
export const getCats = async (req, res, next) => {
  try {
    const cat = await Cat.find().sort('-updatedAt');
    res.status(200).json(cat);
  } catch (err) {
    next(err);
    // res.status(501).json(err);
  }
};

//Recupérer un utilisateur
export const getCat = async (req, res, next) => {
  try {
    const cat = await Cat.findById(req.params.id);
    res.status(200).json(cat);
  } catch (err) {
    next(err);
    // res.status(501).json(err);
  }
};

//Modifier un cat
export const updateCat = async (req, res, next) => {
  try {
    const catId = req.params.id;
    const updateCat = await Cat.findByIdAndUpdate(
      catId,
      {
        $set: req.body,
      },
      { new: true } //Permet d'afficher les nouvelles valeurs
    );
    res.status(200).json(updateCat.id + 'Modification réussie');
  } catch (err) {
    next(err);
    // res.status(501).send(err);
  }
};

//Créer un cat
export const createCat = async (req, res, next) => {
  try {
    const cats = req.body;
    const cat = new Cat(cats);
    await cat.save();
    res.status(201).json('CatSection created');
  } catch (err) {
    console.log(err);
    next(err);
    res.status(501).send(err);
  }
};

//Supprimer un utilisateur
export const deleteCat = async (req, res, next) => {
  try {
    const CatId = req.params.id;
    await Cat.findByIdAndDelete(CatId);
    res.status(200).json('CatSection has been deleted.');
  } catch (err) {
    next(err);
    res.status(501).json(err);
  }
};
