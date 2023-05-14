import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import moment from 'moment';

import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../context/authContext';

const AjeetNtleSingleScreen = () => {
  //Notre utilisateur actuel
  const { currentUser } = useContext(AuthContext);

  //Declaration de notre variable
  //post est la variable dans laquelle se trouve les informations d'un article(post)
  const [post, setPost] = useState({});
  const [president, setPresident] = useState([]);

  //Atteindre l'url
  const location = useLocation();
  //Recupère l'Id du post qui est contenu dans l'url
  //C'est grâce à cet Id qu'on pourra attendre notre utilisateur, ainsi afficher son nom
  const postId = location.pathname.split('/')[2];

  const navigate = useNavigate();

  //Recupération des informations d'un seul post
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          // `http://localhost:6600/api/posts/read/${postId}`
          'http://localhost:1000/api/postAjeetNtles/read/' + postId
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
        'http://localhost:1000/api/postAjeetNtles/delete/' + postId,
        {
          withCredentials: true,
        }
      );
      navigate('/sectionBiographie'); //Si la suppression est réussie, nous sommes dirigé sur la page d'accueil
    } catch (err) {
      console.log(err);
    }
  };
  //Liste de toutes présidents nationaux
  useEffect(() => {
    const fetcchAllUsers = async () => {
      try {
        const res = await axios.get(
          'http://localhost:1000/api/presiNationals/list'
        ); //Recupère tous les livres
        console.log(res);
        setPresident(res.data); //Mettre à jour les livres
      } catch (err) {
        console.log(err);
      }
    };
    fetcchAllUsers();
  }, []);

  //Afin d'éviter que la balise "p" ne s'affiche
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  return (
    <div className="">
      <Helmet>
        <title> Histoire AJEET NTLE</title>
      </Helmet>

      <Container className="posts">
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
              <h1> Histoire de l'AJEET : {post?.cat?.title}</h1>

              {/* Si currentUser.username(nom qui se trouve dans le local storage) est égal  à post.username*/}
              {/* (nom de l'utilisateur qui a crée le post), alors on affiche les boutons "modifier" et "supprimer" */}
              {/* currentUser?.userId?.isAdmin === true  */}
              {currentUser?.isAdmin === true && (
                <div className="edit">
                  <Link to={`/writepostAjeetNtle`} state={post}>
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
              <p>Posted {moment(post?.date).fromNow()}</p>
            </div>
            <Card>
              <div className="">
                <h2>Decription</h2>
                <span className="desc">{getText(post?.desc)}</span>
              </div>
            </Card>
          </Col>
          <Col md={4}>
            {' '}
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Les Présidents Nationaux</Card.Title>
                {president.map((presi) => (
                  <div className="" key={presi._id}>
                    <Link
                      className="post_recom"
                      to={`/presiNational/${presi._id}`}
                    >
                      {' '}
                      <span className="presiInfo">{presi?.name}</span>
                      <span className="presiInfo">{presi?.lastname}</span>{' '}
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

export default AjeetNtleSingleScreen;
