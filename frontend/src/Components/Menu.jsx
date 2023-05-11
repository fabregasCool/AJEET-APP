import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AuthContext } from '../context/authContext';
import { Link } from 'react-router-dom';

function Menu() {
  //Recupère notre currentUser stocker dans le localStorage après sa connexion
  const { currentUser, logout } = useContext(AuthContext);

  //Declaration de notre variable qui contient les cats(articles)
  const [cats, setCats] = useState([]);

  //Fonction useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'http://localhost:1000/api/catSections/list'
          // `http://localhost:1000/api/cats/list`
        );
        setCats(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  });

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        {/* <Navbar.Brand href="#">LOGO</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {/* Ce bouton est desactivé si un utilisateur existe deja */}
            {!currentUser && <Link to="/login">Login</Link>}

            <Link to="/home">Home</Link>
            <Link to="/write">Creer un post</Link>

            <Link to="/addCatSection">Créer une Categorie de Section</Link>
            <Link to="/catSectionList">Liste des Catégories</Link>
            <Link to="/sectionsList">Sections et Presi de Sections</Link>

            <Link to="/writeSection">Créer IntroSection</Link>
            <Link to="/sectionBiographie">Liste Intro Section</Link>

            <Link to="/writeBiographiePresiSection">
              Créer un President de section
            </Link>

            <Link to="/presiNationalList">Liste des Presidents Nationaux</Link>

            <Link to="/PresiSectionList">Tous les Presidents de section</Link>

            <Link to="/home">Accueil</Link>
            {/* <Link to="/historique">Historique</Link> */}
            {/* Affichage des Sections  */}
            <NavDropdown title="Sections" id="navbarScrollingDropdown">
              {cats.map((cat) => (
                <Link
                  className="link"
                  to={`/PresiSectionByCategory/${cat._id}`}
                >
                  <div className="post" key={cat.id}>
                    <NavDropdown.Item href="#action3">
                      {cat.title}
                    </NavDropdown.Item>
                  </div>
                </Link>
              ))}

              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {currentUser?.isAdmin === true && (
            <Link to="/register">Créer un nouvel utilisateur</Link>
          )}

          {currentUser?.isAdmin === true && (
            <Link to="/usersList">Liste des utilisateurs</Link>
          )}
          {/* Affiche l'image à condition que l'utilisateur soit connecté */}
          {currentUser && (
            <span>
              {' '}
              {/* Affiche le l'image de l'utilisateur actuel */}
              <img
                className="img_currentUser"
                src={`../upload/${currentUser?.img}`}
                alt=""
              />
            </span>
          )}
          {currentUser && (
            <>
              <span> Bienvenue {currentUser?.username}</span>{' '}
              <NavDropdown title="" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">
                  <Link className="link" to={`/updateUser/${currentUser._id}`}>
                    Modifier le profil
                  </Link>
                </NavDropdown.Item>

                {/*  */}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>
                  {' '}
                  {/* L'utilisateur se deconnecte */}
                  Deconnexion
                </NavDropdown.Item>
              </NavDropdown>
            </>
          )}
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
