import React, { useEffect, useState } from 'react';
import axios from 'axios';

import moment from 'moment';

import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const PresiNationalSingleScreen = () => {
  //
  //Declaration de notre variable
  //presiNational est la variable dans laquelle se trouve les informations d'un article(presiNational)
  const [presiNational, setPresiNatioinal] = useState({});
  const [presidents, setPrésidents] = useState([]); //Variable pour afficher les prési en recommandation

  //Atteindre l'url
  const location = useLocation();
  //Recupère l'Id du presiNational qui est contenu dans l'url
  //C'est grâce à cet Id qu'on pourra attendre notre utilisateur, ainsi afficher son nom
  const presiNationalId = location.pathname.split('/')[2];

  const navigate = useNavigate();

  //Recuperer les presidents en fonction de la categorie en passant par l'id du president de section
  useEffect(() => {
    const fetcchAllUsers = async () => {
      try {
        const res = await axios.get(
          'http://localhost:1000/api/presiNationals/ByCategoryWhithPresiNationalId/' +
            presiNationalId
        ); //Recupère tous les présidents par sections ou categories de sections
        console.log(res);
        setPrésidents(res.data); //Mettre à jour les livres
      } catch (err) {
        console.log(err);
      }
    };
    fetcchAllUsers();
  }, []);

  //Recupération des informations d'un seul presiNational
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          // `http://localhost:6600/api/posts/read/${postId}`
          'http://localhost:1000/api/presiNationals/read/' + presiNationalId
        );
        setPresiNatioinal(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [presiNationalId]);

  //Creation de la fonction handleDelete (Supprimer un presiNational)
  const handleDelete = async () => {
    try {
      await axios.delete(
        // `http://localhost:6600/api/posts/${postId}`
        'http://localhost:1000/api/presiNationals/delete/' + presiNationalId,
        {
          withCredentials: true,
        }
      );
      navigate('/presiNationalList'); //Si la suppression est réussie, nous sommes dirigé sur la page d'accueil
    } catch (err) {
      console.log(err);
    }
  };

  //Afin d'éviter que la balise "p" ne s'affiche
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  return (
    <div className="single">
      <Container className="posts">
        <Row>
          <Col md={12}>
            <Card className="mb-3">
              <img
                src={`../upload/${presiNational?.img}`}
                alt=""
                className="img-large"
              />
              <div className="user">
                {presiNational?.userImg && (
                  <img src={`../upload/${presiNational?.userImg}`} alt="" />
                )}
              </div>
              <h1>
                Nom et Prenom :{presiNational?.name} {presiNational?.lastname}
              </h1>

              {/* Si currentUser.username(nom qui se trouve dans le local storage) est égal  à presiNational.username*/}
              {/* (nom de l'utilisateur qui a crée le presiNational), alors on affiche les boutons "modifier" et "supprimer" */}
              {/* currentUser?.userId?.isAdmin === true  */}

              <div className="edit">
                <Link
                  to={`/writeBiographiePresiNational`}
                  state={presiNational}
                >
                  {/* state={presiNational} : on prend ttes les infos(id,title,desc,img,date,uid,cat) sur notre presiNational (article) recupérés (en haut par axios) et qui sont contenu dans la variable "presiNational*/}
                  <img src={Edit} alt="" className="img-edit" />
                </Link>

                <img
                  onClick={handleDelete}
                  src={Delete}
                  alt=""
                  className="img-delete"
                />
              </div>
            </Card>
            <div className="info">
              <p>Posted {moment(presiNational?.date).fromNow()}</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            {' '}
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Decription</Card.Title>

                <span className="desc">{getText(presiNational?.desc)}</span>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            {' '}
            <Card className="mb-3">
              <Card.Body>
                Recommandations
                <Card.Title>Presidents Nationaux</Card.Title>
                {presidents.map((post) => (
                  <div className="post" key={post.id}>
                    <div className="content">
                      <Link className="link" to={`/presiNational/${post._id}`}>
                        <span>
                          {post?.name} {post?.lastname}
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>{' '}
          </Col>
        </Row>
      </Container>

      {/* Composant "Menu" Contient les articles recommandés qui sont de la même catégorie que le presiNational en cours d'où la props  cat={presiNational.cat}*/}
    </div>
  );
};

export default PresiNationalSingleScreen;
