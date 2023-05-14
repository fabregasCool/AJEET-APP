import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import { AuthContext } from '../context/authContext';

//AFFICHE TOUS LES PRESIDENTS DE SECTION
const PresiSectionListPage = () => {
  //Notre utilisateur actuel
  const { currentUser } = useContext(AuthContext);

  //Déclaration de la variable qui va recevoir tous les utilisateurs
  const [president, setPresident] = useState([]);

  useEffect(() => {
    const fetcchAllUsers = async () => {
      try {
        const res = await axios.get(
          'http://localhost:1000/api/presiSections/list'
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
    <div className="">
      <h1>Liste des Présidents de Section </h1>

      <div className="">
        {president?.map((presi) => (
          <div className="" key={presi._id}>
            <img
              className="img_currentUser"
              src={`../upload/${presi?.img}`}
              alt=""
            />
            <span className="presiInfo">{presi?.name}</span>
            <span className="presiInfo">{presi?.lastname}</span>
            <em>
              Section :<span className="presiInfo"> {presi?.cat?.title}</span>
            </em>
            <Button className="btn_presiSectionList" variant="outline-info">
              <Link className="link" to={`/presiSection/${presi._id}`}>
                Details du President
              </Link>
            </Button>
          </div>
        ))}
      </div>
      {currentUser?.isAdmin === true && (
        <Button className="btn_presiAdd" variant="outline-warning">
          <Link className="link" to="/writeBiographiePresiSection">
            Créer un nouveau Président de Section
          </Link>
        </Button>
      )}
    </div>
  );
};

export default PresiSectionListPage;
