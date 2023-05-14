// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import Alert from 'react-bootstrap/Alert';

const Login = () => {
  // Code pour l'obliger a rester sur sur la page d'accueil si un utilisateur est déja connecté
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  //Declaration des variables
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  //Utilisation de useNavigate

  //Variable pour recupérer le message d'erreur qui s'affiche dans la console
  //disant que l'utilisateur existe déjà:"User already exists"
  const [err, setError] = useState(null);

  //Recuperer notre utilisateur actuel
  const { login } = useContext(AuthContext);
  //console.log(currentUser);

  //Fonction handleChange
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //Fonction handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await axios.post("http://localhost:6600/api/auth/login", inputs, {
      //   withCredentials: true,
      // });
      await login(inputs); //Est lié à "const { login } = useContext(AuthContext);"
      navigate(redirect || '/');
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message);
    }
  };
  //console.log(inputs);

  //Grace à ce code, il sera tjrs redirigé vers la page d'accueil si le client est deja connecté
  useEffect(() => {
    if (currentUser) {
      navigate(redirect);
    }
  }, [navigate, redirect, currentUser]);
  return (
    <Container className="auth_login">
      <Helmet>
        <title> Connectez-Vous</title>
      </Helmet>
      <h1 className="my-3">Connectez-Vous</h1>
      <Form className="form_login">
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="username"
            name="username"
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password </Form.Label>
          <Form.Control
            required
            type="password"
            name="password"
            autocomplete="on"
            onChange={handleChange}
          />
        </Form.Group>

        <div className="mb-3">
          {err && <p>{err}</p>}
          {err && <Alert variant="danger">{err}</Alert>}
          <Button variant="primary" onClick={handleSubmit}>
            Login
          </Button>

          {/* <span>
            Don't you have account?<Link to="/register">Register</Link>
          </span> */}
        </div>
      </Form>
    </Container>
  );
};

export default Login;
