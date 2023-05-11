import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import "./Users.scss";
import { useNavigate, useParams } from 'react-router-dom';

const CategorieSectionUpdatePage = () => {
  const navigate = useNavigate();

  //Variable pour recupérer le message d'erreur qui s'affiche dans la console
  //disant que l'utilisateur existe déjà:"User already exists"
  const [err, setError] = useState(null);

  //Récupération de l'id de l'utilisateur qui se trouve dans l'url
  const catId = useParams().id;

  //Déclaration des variables

  const [title, setTitle] = useState('');

  //Si l'utilistateur existe déja, on recupère ses informations grace à la fonction (getUser)
  useEffect(() => {
    if (catId) {
      // recuperation d'un utilisateur
      getUser(catId);
    }
  }, [catId]);

  //Création de la fonction getUser (Elle recupère les informations de la BDD vers le front-end)
  //c'est grace a ce code que le nom et le prenom s'affiche automatiquement quand on clique sur modifier
  const getUser = async (catId) => {
    const response = await axios.get(
      'http://localhost:1000/api/catSections/read/' + catId
    );
    setTitle(response.data.title);
  };

  //Création de la fonction handleClick
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        'http://localhost:1000/api/catSections/update/' + catId,
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
    <div className="add_div">
      {err && <p className="error">{err}</p>}
      <div className="content">
        <div>
          {/* Insertion du Matricule */}
          <label>Matricule</label>
          <input
            type="text"
            value={title}
            placeholder="Matricule"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      <div className="item">
        <div className="buttons">
          <button onClick={handleClick}>Envoyer</button>
          {/* Au lieu de {handleClick}, on pouvait utiliser aussi {handleSubmit } */}
        </div>
      </div>
    </div>
  );
};

export default CategorieSectionUpdatePage;
