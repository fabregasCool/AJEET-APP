import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import "./Users.scss";
import { useNavigate, useParams } from 'react-router-dom';

//En fait on ne fait pas de crud de sections; c'est la catSection qui représente nos sections
const SectionsUpdatePage = () => {
  const navigate = useNavigate();

  //Variable pour recupérer le message d'erreur qui s'affiche dans la console
  //disant que l'utilisateur existe déjà:"User already exists"
  const [err, setError] = useState(null);

  //Récupération de l'id de l'utilisateur qui se trouve dans l'url
  const userId = useParams().id;

  //Déclaration des variables

  const [title, setTitle] = useState('');

  //Si l'utilistateur existe déja, on recupère ses informations grace à la fonction (getUser)
  useEffect(() => {
    if (userId) {
      // recuperation d'un utilisateur
      getUser(userId);
    }
  }, [userId]);

  //Création de la fonction getUser (Elle recupère les informations de la BDD vers le front-end)
  //c'est grace a ce code que le nom et le prenom s'affiche automatiquement quand on clique sur modifier
  const getUser = async (userId) => {
    const response = await axios.get(
      'http://localhost:1000/api/catSections/read/' + userId
    );
    setTitle(response.data.title);
  };

  //Création de la fonction handleClick
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        'http://localhost:1000/api/catSections/update/' + userId,
        {
          title,
        },
        { withCredentials: true }
      );
      navigate('/sectionsList'); //Si l'article est crée sans problème, on sera dirigé vers la page d'accueil
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

export default SectionsUpdatePage;
