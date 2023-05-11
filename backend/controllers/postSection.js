//Represente le Post(Introduction,dev, image de la section)

import PostSection from '../models/PostSection.js';

//Recupérer tous les utilisateurs
export const getPostSections = async (req, res, next) => {
  try {
    const postSection = await PostSection.find().sort('-updatedAt').populate({
      path: 'cat',
      select: '',
    });
    res.status(200).json(postSection);
  } catch (err) {
    next(err);
    // res.status(501).json(err);
  }
};

//Recupérer un utilisateur
export const getPostSection = async (req, res, next) => {
  try {
    const postSection = await PostSection.findById(req.params.id).populate({
      path: 'cat',
      select: '',
    });
    res.status(200).json(postSection);
  } catch (err) {
    next(err);
    // res.status(501).json(err);
  }
};

//Modifier un postSection
export const updatePostSection = async (req, res, next) => {
  try {
    const postSectionId = req.params.id;
    const updatePostSection = await PostSection.findByIdAndUpdate(
      postSectionId,
      {
        $set: req.body,
      },
      { new: true } //Permet d'afficher les nouvelles valeurs
    );
    res.status(200).json(updatePostSection.id + 'Modification réussie');
  } catch (err) {
    next(err);
    // res.status(501).send(err);
  }
};

//Créer un postSection
export const createPostSection = async (req, res, next) => {
  try {
    const postSections = req.body;
    const postSection = new PostSection(postSections);
    await postSection.save();
    res.status(201).json('PostSection created');
  } catch (err) {
    console.log(err);
    next(err);
    res.status(501).send(err);
  }
};

//Supprimer un utilisateur
export const deletePostSection = async (req, res, next) => {
  try {
    const PostSectionId = req.params.id;
    await PostSection.findByIdAndDelete(PostSectionId);
    res.status(200).json('PostSection has been deleted.');
  } catch (err) {
    next(err);
    res.status(501).json(err);
  }
};

//Recuperer et afficher les post de sections en fonction des categories
// export const getPostsSectionByCategory = async (req, res, next) => {
//   const requet = req.query.requete;
//   const list = await PostSection.find({ cat: requet });
//   const list = req.query.cat
//     ? await PostSection.find({ cat: requete }).sort('-updatedAt').populate({
//         path: 'cat',
//         select: '',
//       })
//     : await PostSection.find({}).sort('-updatedAt').populate({
//         path: 'cat',
//         select: '',
//       });
//   res.status(200).json(list);
// };

//Recuperer et afficher les post de sections en fonction des categories
export const getPostsSectionByCategory = async (req, res, next) => {
  try {
    const catId = req.params.categoryId;
    const list = await PostSection.find({ cat: catId }).populate({
      path: 'cat',
      select: '',
    });
    res.status(200).json(list);
  } catch (err) {
    next(err);
    res.status(501).json(err);
  }
};
