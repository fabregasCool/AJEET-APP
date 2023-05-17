import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';

const UsersListPage = () => {
  //Déclaration de la variable qui va recevoir tous les utilisateurs
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetcchAllUsers = async () => {
      try {
        const res = await axios.get('http://localhost:1000/api/users/list'); //Recupère tous les livres
        console.log(res);
        setUsers(res.data); //Mettre à jour les livres
      } catch (err) {
        console.log(err);
      }
    };
    fetcchAllUsers();
  });

  //Créer la fonction pour supprimer un livre
  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:1000/api/users/delete/' + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="userdiv">
      <h1>Liste des Utilisateurs </h1>

      <div className="users">
        {users?.map((user) => (
          <div className="user" key={user._id}>
            <img
              className="img_currentUser"
              src={`../upload/${user?.img}`}
              alt=""
            />
            <span className="username">{user?.username}</span>
            <Button
              variant="outline-danger"
              className="btn_usersList"
              onClick={() => handleDelete(user._id)}
            >
              Delete
            </Button>
            <Button className="btn_usersList" variant="outline-info">
              <Link className="link" to={`/updateUser/${user._id}`}>
                Update the user
              </Link>
            </Button>
          </div>
        ))}
      </div>
      <Button className="" variant="outline-warning">
        <Link className="link" to="/register">
          Add new User
        </Link>
      </Button>
    </div>
  );
};

export default UsersListPage;
