import PresiNational from '../models/PresiNational.js';

//Recupérer tous les utilisateurs
export const getPresiNationals = async (req, res, next) => {
  try {
    const presiNational = await PresiNational.find()
      .sort('-updatedAt')
      .populate({
        path: 'cat',
        select: '',
      });
    res.status(200).json(presiNational);
  } catch (err) {
    next(err);
    // res.status(501).json(err);
  }
};

//Recupérer un utilisateur
export const getPresiNational = async (req, res, next) => {
  try {
    const presiNational = await PresiNational.findById(req.params.id).populate({
      path: 'cat',
      select: '',
    });
    res.status(200).json(presiNational);
  } catch (err) {
    next(err);
    // res.status(501).json(err);
  }
};

//Modifier un presiNational
export const updatePresiNational = async (req, res, next) => {
  try {
    const presiNationalId = req.params.id;
    const updatePresiNational = await PresiNational.findByIdAndUpdate(
      presiNationalId,
      {
        $set: req.body,
      },
      { new: true } //Permet d'afficher les nouvelles valeurs
    );
    res.status(200).json(updatePresiNational.id + 'Modification réussie');
  } catch (err) {
    next(err);
    // res.status(501).send(err);
  }
};

//Créer un presiNational
export const createPresiNational = async (req, res, next) => {
  try {
    const presiNationals = req.body;
    const presiNational = new PresiNational(presiNationals);
    await presiNational.save();
    res.status(201).json('PresiNational created');
  } catch (err) {
    console.log(err);
    next(err);
    res.status(501).send(err);
  }
};

//Supprimer un utilisateur
export const deletePresiNational = async (req, res, next) => {
  try {
    const PresiNationalId = req.params.id;
    await PresiNational.findByIdAndDelete(PresiNationalId);
    res.status(200).json('PresiNational has been deleted.');
  } catch (err) {
    next(err);
    res.status(501).json(err);
  }
};

//Recuperer et afficher les présidents de sections (mais ici on a plus besoin de recupérer l'id de la categorie mais plutot on passé par l'id du président qui se trouve dans l'url)
export const getPresiNationalByCategoryWhithPresiNationalId = async (
  req,
  res,
  next
) => {
  try {
    //On recupère le President à travers son id qui se trouve dans l'url
    const presiNational = await PresiNational.findById(
      req.params.preseiNationalId
    ).populate({
      path: 'cat',
      select: '',
    });
    console.log('Identifiant du President de section' + presiNational.cat._id);
    const list = await PresiNational.find({
      cat: presiNational.cat._id,
    }).populate({
      path: 'cat',
      select: '',
    });
    res.status(200).json(list);
  } catch (err) {
    next(err);
    res.status(501).json(err);
  }
};
