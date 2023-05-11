import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';

const Register = () => {
  //Declaration des variables
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
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
      navigate('/login');
      //console.log(res);
    } catch (err) {
      // console.log(err);
      setError(err?.response?.data); //Afiiche l'erreur de la console
    }
  };
  //console.log(inputs);

  return (
    <div className="auth">
      {/* <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Register</button>
       
        {err && <p>{err}</p>}
        <span>
          Do you have account?<Link to="/login">Login</Link>
        </span>
      </form> */}
      <Container>
        <Helmet>
          <title> Creer un Compte</title>
        </Helmet>
        <h1 className="my-3">S'enregistrer</h1>
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

          <div className="mb-3">
            <Button onClick={handleSubmit}>Login</Button>
            {err && <p>{err}</p>}
            {/* <span>
          Don't you have account?<Link to="/register">Register</Link>
        </span> */}
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Register;
