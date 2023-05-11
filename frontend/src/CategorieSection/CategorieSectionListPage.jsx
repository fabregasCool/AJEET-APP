import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const CategorieSectionListPage = () => {
  //Déclaration de la variable qui va recevoir tous les utilisateurs
  const [catSections, setCatsSection] = useState([]);

  useEffect(() => {
    const fetcchAllUsers = async () => {
      try {
        const res = await axios.get(
          'http://localhost:1000/api/catSections/list'
        ); //Recupère tous les livres
        console.log(res);
        setCatsSection(res.data); //Mettre à jour les livres
      } catch (err) {
        console.log(err);
      }
    };
    fetcchAllUsers();
  }, []);

  //Créer la fonction pour supprimer un livre
  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:1000/api/catSections/delete/' + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="userdiv">
      <h1>Liste des Catégories de sections </h1>

      <div className="catSections">
        {catSections?.map((cat) => (
          <div className="user" key={cat._id}>
            <span>{cat?.title}</span>
            <button
              className="btn_delete_user"
              onClick={() => handleDelete(cat._id)}
            >
              Delete
            </button>
            <button className="btn_update_user">
              <Link className="link" to={`/updateCatSection/${cat._id}`}>
                Update the user
              </Link>
            </button>
            <Link
              className="link"
              to={`/presiSectionByCategoryList/${cat._id}`}
            >
              {' '}
              <Button variant="success">
                Voir les présidents de cette section
              </Button>
            </Link>
          </div>
        ))}
      </div>
      <button className="btn_add_user">
        <Link className="link" to="/addCatSection">
          Add new Category
        </Link>
      </button>
    </div>
  );
};

export default CategorieSectionListPage;
