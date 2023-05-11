import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

//On stocke toutes les informations de l'utilisateur dans ce "AuthContext" qui seront ensuite stocké dans le stockage local(console/application)
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user') || null) //Tout ce qui est stocké dans local storage est "string", on va le transformé en objet grace à "JSON.parse()"
  );

  //Fonction de connexion (login)
  const login = async (inputs) => {
    const res = await axios.post(
      'http://localhost:1000/api/auth/login/',
      inputs,
      {
        withCredentials: true,
      }
    );
    setCurrentUser(res.data);
  };

  //Fonction de deconnexion (logout)
  const logout = async () => {
    if (window.confirm('Voulez vous vraiment vous deconnecter ?')) {
      await axios.get('http://localhost:1000/api/auth/logout/', {
        withCredentials: true,
      });
      setCurrentUser(null);
    }
  };

  //useEffect va nous permettre de mettre à jour notre localStorage
  //à chaque fois que l'utilisateur connecté change

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
