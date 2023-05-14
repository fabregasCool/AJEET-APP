import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import Alert from 'react-bootstrap/Alert';

const Register = () => {
  //Declaration des variables
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  //Utilisation de useNavigate
  const navigate = useNavigate();

  //Variable pour recupérer le message d'erreur qui s'affiche dans la console
  //disant que l'utilisateur existe déjà:"User already exists"
  const [err, setError] = useState(null);

  //Fonction handleChange
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //Fonction handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:1000/api/auth/register', inputs);
      navigate('/usersList');
      //console.log(res);
    } catch (err) {
      // console.log(err);
      setError(err?.response?.data.message); //Afiiche l'erreur de la console
    }
  };
  //console.log(inputs);

  return (
    <Container className="auth_register">
      <Helmet>
        <title> Créer un Nouvel Utilisateur</title>
      </Helmet>
      <h1 className="my-3">Créer un Nouvel Utilisateur</h1>
      <Form className="form_register">
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username </Form.Label>
          <Form.Control
            className="FormControl"
            required
            type="text"
            placeholder="username"
            name="username"
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email </Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            autocomplete="on"
            onChange={handleChange}
          />
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

        <Form.Group className="mb-3" controlId="confirm_password">
          <Form.Label>Confirm Password </Form.Label>
          <Form.Control
            required
            type="confirm_password"
            name="confirm_password"
            autocomplete="on"
            onChange={handleChange}
          />
        </Form.Group>

        <div className="mb-3">
          {err && <p>{err}</p>}
          {err && <Alert variant="danger">{err}</Alert>}
          <Button variant="primary" onClick={handleSubmit}>
            Register
          </Button>

          {/* <span>
          Don't you have account?<Link to="/register">Register</Link>
        </span> */}
        </div>
      </Form>
    </Container>
  );
};

export default Register;
