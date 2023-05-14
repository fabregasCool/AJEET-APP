import Post from '../models/Post.js';

//Recupérer tous les utilisateurs
export const getPosts = async (req, res, next) => {
  try {
    const post = await Post.find().sort('-updatedAt');
    res.status(200).json(post);
  } catch (err) {
    next(err);
    // res.status(501).json(err);
  }
};

//Recupérer un utilisateur
export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate({
      path: 'userId',
      select: '-password',
    });
    res.status(200).json(post);
  } catch (err) {
    next(err);
    // res.status(501).json(err);
  }
};

//Modifier un post
export const updatePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const updatePost = await Post.findByIdAndUpdate(
      postId,
      {
        $set: req.body,
      },
      { new: true } //Permet d'afficher les nouvelles valeurs
    );
    res.status(200).json(updatePost.id + 'Modification réussie');
  } catch (err) {
    next(err);
    // res.status(501).send(err);
  }
};

//Créer un post
export const createPost = async (req, res, next) => {
  try {
    const posts = req.body;
    const post = new Post(posts);
    await post.save();
    res.status(201).json('Post created');
  } catch (err) {
    console.log(err);
    next(err);
    res.status(501).send(err);
  }
};

//Supprimer un utilisateur
export const deletePost = async (req, res, next) => {
  try {
    const PostId = req.params.id;
    await Post.findByIdAndDelete(PostId);
    res.status(200).json('Post has been deleted.');
  } catch (err) {
    next(err);
    res.status(501).json(err);
  }
};
