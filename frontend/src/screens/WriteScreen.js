import React, { useContext, useState } from 'react';
import axios from 'axios';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../context/authContext';

import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function WriteScreen() {
  //Recupère notre currentUser stocker dans le localStorage après sa connexion
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const state = useLocation().state; //C'est ce state qui se trouve dans Single.jsx : <Link to={`/write?edit=2`} state={post}>

  //Après avoir créer notre variable, on peut mainteneant l'utiliser

  const [value, setValue] = useState(state?.desc || ''); //C'est ce "value" qui se trouve dans la div "editorContainer" reservée à la desccription de notre article
  const [title, setTitle] = useState(state?.title || ''); //Le titre
  const [file, setFile] = useState(''); //l'image

  // const [title, setTitle] = useState(state?.title || ""): On inistilalise notre "useState" en lui disant de prendre
  //le titre actuel(dans ce cas c'est une mise à jour); s'il ne trouve pas de titre, c'est que c'est un nouveau post donc
  //on initialise avec une chaine de caractère vide; C'EST PAREIL POUR LES AUTRES VARIABLES

  //Fonction upload image
  const upload = async () => {
    try {
      //Pour télécharger n'importe quel fichier, nous devrions d'abord créerdes données

      const formData = new FormData(); //Ainsi on crée "formData" et c'est à l'intérieur de "formData" que ns allons passer notre fichier 'file'

      //Pour ajouter(passer) notre fichier 'file'à "formData" nous utiliseront la méthode "append"
      formData.append('file', file);
      // "file": c'est notre fichier crée dans index(backend), il reçoit nos images
      //file: designe la varibale de nos images

      const res = await axios.post(
        'http://localhost:1000/api/upload/',
        formData,
        {
          withCredentials: true,
        }
      );
      return res.data; //On recupère l'image téléchargée
      //console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  //Création de la fonction handleClick
  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload(); //Ntre fonction "upload" est stockée dans la variable "imgUrl" ainis on peut l'utiliser dans le reste de la fonction

    try {
      state // On demande s'il ya un "state", si oui, cela signifie que c'est une  page de mise à jour donc on utilise notre route de "update"
        ? await axios.put(
            `http://localhost:1000/api/posts/update/${state._id}`,
            {
              title,
              desc: value,
              img: file ? imgUrl : state.img, //On verifie si la variable(img) contient qqch, si oui on envoie l'URL de l'image(nom + ext); sinon on recupère son ancienne image
              //NB: file est la varaible qui contient l'image
            },
            { withCredentials: true }
          )
        : //Dans le 2nd cas, il n'ya pas de "state" donc on crée un nouveau post
          await axios.post(
            `http://localhost:1000/api/posts/create`,
            {
              userId: currentUser._id,
              title,
              desc: value,
              img: file ? imgUrl : '',
              date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), //On envoi egalement la date
            },
            { withCredentials: true }
          );
      navigate('/'); //Si l'article est crée sans problème, on sera dirigé vers la page d'accueil
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <div className="write_div">
      <Helmet>
        <title> Créer un Post</title>
      </Helmet>
      <div className="">
        <h1> Créer un Post</h1>
        <Form.Control
          className="FormControl"
          type="text"
          value={title}
          placeholder="Titre du Post"
          onChange={(e) => setTitle(e.target.value)}
        ></Form.Control>
        {/* Insertion de l'éditeur de texte ReactQuill */}
        <div className="editorContainer">
          <ReactQuill
            className="editor "
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Publier votre Post</Card.Title>
              <Button variant="danger" className="btn_upload">
                <input
                  style={{ display: 'none' }}
                  type="file"
                  id="file"
                  name=""
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <label className="file" htmlFor="file">
                  Télécharger l'image
                </label>
              </Button>

              <Button
                variant="success"
                onClick={handleClick}
                className="btn_send"
              >
                Envoyer
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b>Draft
          </span>
          <span>
            <b>Visibility:</b>Public or Prive
          </span>

          <input
            style={{ display: 'none' }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Télécharger l'image
          </label>

          <div className="buttons">
            <button>Save as a Draft</button>
            <button onClick={handleClick}>Publish</button>
            
          </div>
        </div>
      </div> */}
    </div>
  );
}
