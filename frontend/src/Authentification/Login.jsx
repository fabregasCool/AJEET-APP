// import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';

const Login = () => {
  //Declaration des variables
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  //Utilisation de useNavigate
  const navigate = useNavigate();

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
      navigate('/');
    } catch (err) {
      setError(err.response?.data);
    }
  };
  //console.log(inputs);

  return (
    <Container>
      <Helmet>
        <title> Connectez-Vous</title>
      </Helmet>
      <h1 className="my-3">Login</h1>
      <Form>
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
          <Button onClick={handleSubmit}>Login</Button>
          {err && <p>{err}</p>}
          {/* <span>
          Don't you have account?<Link to="/register">Register</Link>
        </span> */}
        </div>
      </Form>
    </Container>
  );
};

export default Login;
