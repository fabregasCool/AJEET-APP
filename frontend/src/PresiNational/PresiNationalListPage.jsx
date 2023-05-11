import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//AFFICHE TOUS LES PRESIDENTS DE SECTION
const PresiNationalListPage = () => {
  //Déclaration de la variable qui va recevoir tous les utilisateurs
  const [president, setPresident] = useState([]);

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

  return (
    <div className="userdiv">
      <h1>Liste des Présidents de Section </h1>

      <div className="president">
        {president?.map((presi) => (
          <div className="user" key={presi._id}>
            <img
              className="img_currentUser"
              src={`../upload/${presi?.img}`}
              alt=""
            />
            <span>{presi?.name}</span>
            <span>{presi?.lastname}</span>{' '}
            <span>Section : {presi?.cat?.title}</span>
            <button className="btn_update_user">
              <Link className="link" to={`/presiNational/${presi._id}`}>
                Details du President
              </Link>
            </button>
          </div>
        ))}
      </div>
      <button className="btn_add_user">
        <Link className="link" to="/writeBiographiePresiNational">
          Créer un nouveau Président de Section
        </Link>
      </button>
    </div>
  );
};

export default PresiNationalListPage;
