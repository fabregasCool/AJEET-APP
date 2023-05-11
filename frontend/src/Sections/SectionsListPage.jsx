import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

//En fait on ne fait pas de crud de sections; c'est la catSection qui représente nos sections
const SectionsListPage = () => {
  //Déclaration de la variable qui va recevoir tous les utilisateurs
  const [sections, setSections] = useState([]); //Liste des section

  //Liste des section
  useEffect(() => {
    const fetcchAllUsers = async () => {
      try {
        const res = await axios.get(
          'http://localhost:1000/api/catSections/list'
        ); //Recupère tous les livres
        console.log(res);
        setSections(res.data); //Mettre à jour les livres
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
      <h1>Liste des Sections </h1>
      <div className="sections">
        {sections?.map((sect) => (
          <div className="user" key={sect._id}>
            <span>{sect?.title}</span>

            <button
              className="btn_delete_user"
              onClick={() => handleDelete(sect._id)}
            >
              Delete
            </button>
            <button className="btn_update_user">
              <Link className="link" to={`/updateSection/${sect._id}`}>
                Update the section
              </Link>
            </button>
            <Link className="link" to="/writeSection">
              {' '}
              <Button>Creer le Post</Button>
            </Link>
          </div>
        ))}
      </div>
      <button className="btn_add_user">
        <Link className="link" to="/addCatSection">
          Add new Section
        </Link>
      </button>

      <div className="sections">
        {/* <div>
          <h1>Présidents des Sections </h1>
          {sections?.map((sect) => (
            <div className="user" key={sect._id}>
              <span>Président de {sect?.title}:</span>
            </div>
          ))}
       
        </div> */}
      </div>
    </div>
  );
};

export default SectionsListPage;
