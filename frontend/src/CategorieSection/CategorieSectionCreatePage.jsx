import React, { useState } from 'react';
import axios from 'axios';
// import "./Users.scss";
import { useNavigate } from 'react-router-dom';

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
    <div className="add_div">
      {err && <p className="error">{err}</p>}
      <div className="content">
        {/* Insertion du Matricule */}
        <input
          type="text"
          value={title}
          placeholder="Matricule"
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Insertion du Nom */}
      </div>

      <div className="item">
        <div className="buttons">
          <button onClick={handleClick}>Envoyer</button>
          {/* Au lieu de {handleClick}, on pouvait utiliser aussi {handleSubmit } */}
          {err && <p>{err}</p>}
        </div>
      </div>
    </div>
  );
};

export default CategorieSectionCreatePage;
