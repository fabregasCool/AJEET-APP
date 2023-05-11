import PresiSection from '../models/PresiSection.js';

//Recupérer tous les utilisateurs
export const getPresiSections = async (req, res, next) => {
  try {
    const presiSection = await PresiSection.find().sort('-updatedAt').populate({
      path: 'cat',
      select: '',
    });
    res.status(200).json(presiSection);
  } catch (err) {
    next(err);
    // res.status(501).json(err);
  }
};

//Recupérer un utilisateur
export const getPresiSection = async (req, res, next) => {
  try {
    const presiSection = await PresiSection.findById(req.params.id).populate({
      path: 'cat',
      select: '',
    });
    res.status(200).json(presiSection);
  } catch (err) {
    next(err);
    // res.status(501).json(err);
  }
};

//Modifier un presiSection
export const updatePresiSection = async (req, res, next) => {
  try {
    const presiSectionId = req.params.id;
    const updatePresiSection = await PresiSection.findByIdAndUpdate(
      presiSectionId,
      {
        $set: req.body,
      },
      { new: true } //Permet d'afficher les nouvelles valeurs
    );
    res.status(200).json(updatePresiSection.id + 'Modification réussie');
  } catch (err) {
    next(err);
    // res.status(501).send(err);
  }
};

//Créer un presiSection
export const createPresiSection = async (req, res, next) => {
  try {
    const presiSections = req.body;
    const presiSection = new PresiSection(presiSections);
    await presiSection.save();
    res.status(201).json('PresiSection created');
  } catch (err) {
    console.log(err);
    next(err);
    res.status(501).send(err);
  }
};

//Supprimer un utilisateur
export const deletePresiSection = async (req, res, next) => {
  try {
    const PresiSectionId = req.params.id;
    await PresiSection.findByIdAndDelete(PresiSectionId);
    res.status(200).json('PresiSection has been deleted.');
  } catch (err) {
    next(err);
    res.status(501).json(err);
  }
};

//Recuperer et afficher les présidents de sections en fonction des categories
export const getPresiSectionByCategory = async (req, res, next) => {
  try {
    const catId = req.params.categoryId;
    const list = await PresiSection.find({ cat: catId }).populate({
      path: 'cat',
      select: '',
    });
    res.status(200).json(list);
  } catch (err) {
    next(err);
    res.status(501).json(err);
  }
};

//Recuperer et afficher les présidents de sections (mais ici on a plus besoin de recupérer l'id de la categorie mais plutot on passé par l'id du président qui se trouve dans l'url)
export const getPresiSectionByCategoryWhithPresiSectionId = async (
  req,
  res,
  next
) => {
  try {
    //On recup_re le President à travers son id qui se trouve dans l'url
    const presiSection = await PresiSection.findById(
      req.params.preseiSectionId
    ).populate({
      path: 'cat',
      select: '',
    });
    console.log('Identifiant du President de section' + presiSection.cat._id);
    const list = await PresiSection.find({
      cat: presiSection.cat._id,
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
