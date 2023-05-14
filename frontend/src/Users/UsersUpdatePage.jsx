import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const UsersUpdatePage = () => {
  const navigate = useNavigate();

  //Variable pour recupérer le message d'erreur qui s'affiche dans la console
  //disant que l'utilisateur existe déjà:"User already exists"
  const [err, setError] = useState(null);
  //Récupération de l'id de l'utilisateur qui se trouve dans l'url
  const userId = useParams().id;

  //Après avoir créer notre variable, on peut mainteneant l'utiliser

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(''); //l'image

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
      'http://localhost:1000/api/users/read/' + userId
    );
    setUsername(response.data.username); //Affiche le nom utilisateur
    setEmail(response.data.email); //Affiche l'email utilisateur
    // setPassword(response.data.password); Affiche l'email utilisateur
  };

  //Fonction upload image
  const upload = async () => {
    try {
      //Pour télécharger n'importe quel fichier, nous devrions d'abord créerdes données

      const formData = new FormData(); //Ainsi on crée "formData" et c'est à l'intérieur de "formData" que ns allons passer notre fichier 'file'

      //Pour ajouter(passer) notre fichier 'file'à "formData" nous utiliseront la méthode "append"
      formData.append('file', file);
      // "file": c'est notre fichier crée dans index(backend), il reçoit nos images
      //file: designe la varibale de nos images

      const res = await axios.post(
        'http://localhost:1000/api/upload/',
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
      await axios.put(
        'http://localhost:1000/api/users/update/' + userId,
        {
          username,
          email,
          password,
          img: file ? imgUrl : '',
        },
        { withCredentials: true }
      );
      navigate('/usersList'); //Si l'article est crée sans problème, on sera dirigé vers la page d'accueil
    } catch (err) {
      // console.log(err);
      setError(err?.response?.data); //Afiiche l'erreur de la console
    }
  };

  return (
    <div className="add_div">
      {err && <p className="error">{err}</p>}
      <Helmet>
        <title> User Update</title>
      </Helmet>
      <h1 className="my-3">Mise à jour de l'utilisateur</h1>
      <Form>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username </Form.Label>
          <Form.Control
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email </Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password </Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <div className="item">
          <input
            style={{ display: 'none' }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button variant="danger">
            <label className="file" htmlFor="file">
              Télécharger l'image
            </label>
          </Button>
        </div>{' '}
        <br />
        <div className="mb-3">
          <Button variant="success" onClick={handleClick}>
            Envoyer
          </Button>
          {err && <p>{err}</p>}
        </div>
      </Form>
    </div>
  );
};

export default UsersUpdatePage;
