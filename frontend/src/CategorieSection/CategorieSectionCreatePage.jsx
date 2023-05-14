import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const CategorieSectionCreatePage = () => {
  const navigate = useNavigate();
  //Variable pour recupérer le message d'erreur qui s'affiche dans la console
  //disant que l'utilisateur existe déjà:"User already exists"
  const [err, setError] = useState(null);

  //Après avoir créer notre variable, on peut mainteneant l'utiliser

  const [title, setTitle] = useState('');

  //Création de la fonction handleClick
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:1000/api/catSections/create`,
        {
          title,
        },
        { withCredentials: true }
      );
      navigate('/catSectionList'); //Si l'article est crée sans problème, on sera dirigé vers la page d'accueil
    } catch (err) {
      // console.log(err);
      setError(err?.response?.data); //Afiiche l'erreur de la console
    }
  };

  return (
    <div className="">
      <Helmet>
        <title> Créer une Categorie de Section</title>
      </Helmet>
      {err && <p className="error">{err}</p>}
      <div className="">
        {/* Insertion de la Catégoie */}
        <Form.Label>Titre de la categorie ou de la section </Form.Label>
        <Form.Control
          className="FormControl"
          type="text"
          value={title}
          placeholder="Titre de la categorie ou de la section"
          onChange={(e) => setTitle(e.target.value)}
        ></Form.Control>

        {/* Insertion du Nom */}
      </div>
      <Button variant="success" onClick={handleClick} className="btn_send">
        Envoyer
      </Button>
    </div>
  );
};

export default CategorieSectionCreatePage;
