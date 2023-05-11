import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const UsersCreatePage = () => {
  const navigate = useNavigate();
  //Variable pour recupérer le message d'erreur qui s'affiche dans la console
  //disant que l'utilisateur existe déjà:"User already exists"
  const [err, setError] = useState(null);

  //Après avoir créer notre variable, on peut mainteneant l'utiliser

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(""); //l'image

  //Fonction upload image
  const upload = async () => {
    try {
      //Pour télécharger n'importe quel fichier, nous devrions d'abord créerdes données

      const formData = new FormData(); //Ainsi on crée "formData" et c'est à l'intérieur de "formData" que ns allons passer notre fichier 'file'

      //Pour ajouter(passer) notre fichier 'file'à "formData" nous utiliseront la méthode "append"
      formData.append("file", file);
      // "file": c'est notre fichier crée dans index(backend), il reçoit nos images
      //file: designe la varibale de nos images

      const res = await axios.post(
        "http://localhost:7700/api/upload/",
        formData,
        {
          withCredentials: true,
        }
      );
      return res.data; //On recupère l'image téléchargée
      //console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  //Création de la fonction handleClick
  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload(); //Ntre fonction "upload" est stockée dans la variable "imgUrl" ainis on peut l'utiliser dans le reste de la fonction

    try {
      await axios.post(
        `http://localhost:7700/api/users/create`,
        {
          username,
          email,
          password,
          img: file ? imgUrl : "",
        },
        { withCredentials: true }
      );
      navigate("/usersList"); //Si l'article est crée sans problème, on sera dirigé vers la page d'accueil
    } catch (err) {
      // console.log(err);
      setError(err?.response?.data); //Afiiche l'erreur de la console
    }
  };

  return (
    <div className="add_div">
      {err && <p className="error">{err}</p>}
      <div className="content">
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="item">
        <input
          style={{ display: "none" }}
          type="file"
          id="file"
          name=""
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label className="file" htmlFor="file">
          Télécharger l'image
        </label>

        <div className="buttons">
          <button onClick={handleClick}>Envoyer</button>
          {/* Au lieu de {handleClick}, on pouvait utiliser aussi {handleSubmit } */}
          {err && <p>{err}</p>}
        </div>
      </div>
    </div>
  );
};

export default UsersCreatePage;
