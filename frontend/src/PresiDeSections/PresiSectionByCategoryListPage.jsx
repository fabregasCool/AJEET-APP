import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';

const PresiSectionByCategoryListPage = () => {
  //Récupération de l'id de l'utilisateur qui se trouve dans l'url
  const catId = useParams().id;

  //Déclaration de la variable qui va recevoir tous les utilisateurs
  const [president, setPrésident] = useState([]);

  useEffect(() => {
    const fetcchAllUsers = async () => {
      try {
        const res = await axios.get(
          'http://localhost:1000/api/presiSections/ByCategory/' + catId
        ); //Recupère tous les présidents par sections ou categories de sections
        console.log(res);
        setPrésident(res.data); //Mettre à jour les livres
      } catch (err) {
        console.log(err);
      }
    };
    fetcchAllUsers();
  });

  //Créer la fonction pour supprimer un livre
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        'http://localhost:1000/api/presiSections/delete/' + id
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <Helmet>
        <title> Liste des Présidents de cette section</title>
      </Helmet>
      <h1>Liste des Présidents de cette section </h1>

      <div className="">
        {president?.map((presi) => (
          <div className="" key={presi._id}>
            <span className="presiInfo">{presi?.name}</span>
            <span className="presiInfo">{presi?.lastname}</span>
            <Button
              className="btn_catsection"
              onClick={() => handleDelete(presi._id)}
              variant="outline-danger"
            >
              Delete
            </Button>
            <Button className="btn_catsection" variant="outline-info">
              <Link className="link" to={`/updateUser/${presi._id}`}>
                Update the user
              </Link>
            </Button>
          </div>
        ))}
      </div>
      <Button className="btn_catsection" variant="outline-warning">
        <Link className="link" to="/addUser">
          Add new User
        </Link>
      </Button>
    </div>
  );
};

export default PresiSectionByCategoryListPage;
