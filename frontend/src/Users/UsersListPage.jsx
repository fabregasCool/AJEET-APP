import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
  }, []);

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
            <span>{user?.username}</span>
            <button
              className="btn_delete_user"
              onClick={() => handleDelete(user._id)}
            >
              Delete
            </button>
            <button className="btn_update_user">
              <Link className="link" to={`/updateUser/${user._id}`}>
                Update the user
              </Link>
            </button>
          </div>
        ))}
      </div>
      <button className="btn_add_user">
        <Link className="link" to="/addUser">
          Add new User
        </Link>
      </button>
    </div>
  );
};

export default UsersListPage;
