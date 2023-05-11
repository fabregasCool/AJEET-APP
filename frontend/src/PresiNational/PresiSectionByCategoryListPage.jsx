import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

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
  }, []);

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
    <div className="userdiv">
      <h1>Liste des Présidents de cette section </h1>

      <div className="president">
        {president?.map((presi) => (
          <div className="user" key={presi._id}>
            <span>{presi?.name}</span>
            <span>{presi?.lastname}</span>
            <button
              className="btn_delete_user"
              onClick={() => handleDelete(presi._id)}
            >
              Delete
            </button>
            <button className="btn_update_user">
              <Link className="link" to={`/updateUser/${presi._id}`}>
                Update the user
              </Link>
            </button>
          </div>
        ))}
      </div>
      <button className="btn_add_user">
        <Link className="link" to="/addUser">
          Add new User
        </Link>
      </button>
    </div>
  );
};

export default PresiSectionByCategoryListPage;
