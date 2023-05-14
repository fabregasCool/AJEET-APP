import { useContext } from 'react';

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

  return (
    <Navbar sticky="top" expand="lg">
      <Container fluid className="Navbar">
        <Navbar.Brand href="">
          <img
            className="img_logo"
            src="../assets/images/coq.jpg"
            alt="Logo Asso"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <div className="links">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {/* Ce bouton est desactivé si un utilisateur existe deja */}{' '}
              {!currentUser && (
                <Link to="/login" className="link">
                  Login
                </Link>
              )}{' '}
              {currentUser?.isAdmin === true && (
                <Link to="/dashboard" className="link">
                  Dashboard
                </Link>
              )}
              <Link to="/" className="link">
                Home
              </Link>
              <Link to="/postSectionsBiographie" className="link">
                Histoire Section
              </Link>
              <Link to="/postAjeetNtleBiographie" className="link">
                Histoire AJEET
              </Link>
              <Link to="/presiNationalList" className="link">
                President Natoinaux
              </Link>
              <Link to="/PresiSectionList" className="link">
                President de Sections
              </Link>
              {/* Affichage des Sections qui sont en réalité les categories de sections */}
              {/* <NavDropdown
                title="Sections"
                id="navbarScrollingDropdown"
                className="nav_section"
              >
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>

            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>

            {currentUser && (
              <>
                <span> Bienvenue {currentUser?.username}</span>{' '}
                <NavDropdown title="" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="">
                    <Link
                      className="link"
                      to={`/updateUser/${currentUser._id}`}
                    >
                      Modifier le profil
                    </Link>
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item href="">
                    <Link className="link" to="/write">
                      Créer un Post
                    </Link>
                  </NavDropdown.Item>

                  {/*  */}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>
                    {' '}
                    {/* L'utilisateur se deconnecte */}
                    <span className="deconnexion"> Deconnexion</span>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
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
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
