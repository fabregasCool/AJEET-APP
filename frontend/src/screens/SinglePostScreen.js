import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import moment from 'moment';
import { AuthContext } from '../context/authContext';

import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import { Helmet } from 'react-helmet-async';

const SinglePostScreen = () => {
  //

  //
  //Declaration de notre variable
  //post est la variable dans laquelle se trouve les informations d'un article(post)
  const [post, setPost] = useState({});

  //Declaration de notre variable qui contient les posts(articles)
  const [posts, setPosts] = useState([]);

  //Atteindre l'url
  const location = useLocation();
  //Recupère l'Id du post qui est contenu dans l'url
  //C'est grâce à cet Id qu'on pourra attendre notre utilisateur, ainsi afficher son nom
  const postId = location.pathname.split('/')[2];

  const navigate = useNavigate();

  //On recupère les informations de l'utilisateur actuel qui sont stockés dans local storage
  const { currentUser } = useContext(AuthContext);

  //Recupération des informations d'un seul post
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          // `http://localhost:6600/api/posts/read/${postId}`
          'http://localhost:1000/api/posts/read/' + postId
        );
        setPost(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  //Creation de la fonction handleDelete (Supprimer un post)
  const handleDelete = async () => {
    try {
      await axios.delete(
        // `http://localhost:6600/api/posts/${postId}`
        'http://localhost:1000/api/posts/delete/' + postId,
        {
          withCredentials: true,
        }
      );
      navigate('/'); //Si la suppression est réussie, nous sommes dirigé sur la page d'accueil
    } catch (err) {
      console.log(err);
    }
  };

  //Fonction useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'http://localhost:1000/api/posts/list'
          // `http://localhost:1000/api/posts/list`
        );
        setPosts(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  });

  //Afin d'éviter que la balise "p" ne s'affiche
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  return (
    <div className="single">
      <Container className="posts">
        <Helmet>
          <title> Single Post</title>
        </Helmet>
        <Row>
          <Col md={8}>
            <Card className="mb-3">
              <img
                src={`../upload/${post?.img}`}
                alt=""
                className="img_single_post"
              />
              <div className="user">
                {post?.userImg && (
                  <img src={`../upload/${post?.userImg}`} alt="" />
                )}
              </div>

              <h1>Titre:{post?.title}</h1>

              {/* Si currentUser.username(nom qui se trouve dans le local storage) est égal  à post.username*/}
              {/* (nom de l'utilisateur qui a crée le post), alors on affiche les boutons "modifier" et "supprimer" */}
              {/* currentUser?.userId?.isAdmin === true  */}
              {currentUser?._id === post?.userId?._id && (
                <div className="edit">
                  <Link to={`/write`} state={post}>
                    {/* state={post} : on prend ttes les infos(id,title,desc,img,date,uid,cat) sur notre post (article) recupérés (en haut par axios) et qui sont contenu dans la variable "post*/}
                    <img src={Edit} alt="" className="img-edit" />
                  </Link>

                  <img
                    onClick={handleDelete}
                    src={Delete}
                    alt=""
                    className="img-delete"
                  />
                </div>
              )}
            </Card>
            <div className="info">
              <span>Post Crée par: {post?.userId?.username}</span>
              <img
                src={`../upload/${post?.userId?.img}`}
                alt=""
                className="img_User"
              />
              <p>Posted {moment(post?.date).fromNow()}</p>
            </div>
            <div className="">
              <h2>Decription Du Post</h2>
              <span className="desc">{getText(post?.desc)}</span>
            </div>
          </Col>
          <Col md={4}>
            {' '}
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Post Recommandés</Card.Title>
                {posts.map((post) => (
                  <div className="" key={post.id}>
                    <Link className="post_recom" to={`/post/${post._id}`}>
                      {post.title}
                    </Link>
                  </div>
                ))}
              </Card.Body>
            </Card>{' '}
          </Col>
        </Row>
      </Container>

      {/* Composant "Menu" Contient les articles recommandés qui sont de la même catégorie que le post en cours d'où la props  cat={post.cat}*/}
    </div>
  );
};

export default SinglePostScreen;
