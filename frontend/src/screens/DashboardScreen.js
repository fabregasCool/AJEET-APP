import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Menu from '../Components/Menu';
export const DashboardScreen = () => {
  return (
    <>
      {/* On affiche le Menu au dessus du dashboard */}
      <Menu />
      <div className="dash_title">
        <h1> DashBoard-Admin</h1>{' '}
      </div>

      <div className="dash">
        <Helmet>
          <title> DashBoard-Admin</title>
        </Helmet>

        <div className="dash_left">
          <div className="Button">
            <Link to="/addCatSection">
              <Button variant="outline-primary">
                Créer une Categorie de Section
              </Button>{' '}
            </Link>
          </div>
          <div className="Button">
            <Link to="/catSectionList">
              <Button variant="outline-primary">Liste des Catégories</Button>{' '}
            </Link>
          </div>
          <div className="Button">
            <Link to="/writepostSections">
              <Button variant="outline-primary">Créer Histoire Section</Button>{' '}
            </Link>
          </div>
          <div className="Button">
            <Link to="/postSectionsBiographie">
              <Button variant="outline-primary">Histoire Section</Button>{' '}
            </Link>
          </div>
          <div className="Button">
            <Link to="/writepostAjeetNtle">
              <Button variant="outline-primary">
                Créer Histoire AJEET Ntle
              </Button>{' '}
            </Link>
          </div>
        </div>

        <div className="dash_right">
          <div className="Button">
            <Link to="/register">
              <Button variant="outline-primary">
                Créer un nouvel utilisateur
              </Button>{' '}
            </Link>
          </div>
          <div className="Button">
            <Link to="/usersList">
              <Button variant="outline-primary">Liste des utilisateurs</Button>{' '}
            </Link>
          </div>
          <div className="Button">
            <Link to="/writeBiographiePresiSection">
              <Button variant="outline-primary">
                Créer un President de section
              </Button>{' '}
            </Link>
          </div>
          <div className="Button">
            <Link to="/PresiSectionList">
              <Button variant="outline-primary">
                Liste des Presidents de section
              </Button>{' '}
            </Link>
          </div>
          <div className="Button">
            <Link to="/writeBiographiePresiNational">
              <Button variant="outline-primary">
                Créer un President National
              </Button>{' '}
            </Link>
          </div>
          <div className="Button">
            <Link to="/presiNationalList">
              <Button variant="outline-primary">
                Liste des Presidents Nationaux
              </Button>{' '}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
