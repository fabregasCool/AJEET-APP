import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { HomeScreen } from './screens/HomeScreen';
import Footer from './Components/Footer';
import Menu from './Components/Menu';
import HistoriqueScreen from './screens/HistoriqueScreen';
import Login from './Authentification/Login';
import Register from './Authentification/Register';
import WriteScreen from './screens/WriteScreen';

import UsersListPage from './Users/UsersListPage';
import UsersUpdatePage from './Users/UsersUpdatePage';
import SinglePostScreen from './screens/SinglePostScreen';

import { PostSectionByCategory } from './screens/PostSectionByCategory';
import CategorieSectionListPage from './CategorieSection/CategorieSectionListPage';
import CategorieSectionCreatePage from './CategorieSection/CategorieSectionCreatePage';
import CategorieSectionUpdatePage from './CategorieSection/CategorieSectionUpdatePage';
import { PresiSectionByCategoryScreen } from './screens/PresiSectionByCategoryScreen';
import SectionsListPage from './Sections/SectionsListPage';
import SectionsUpdatePage from './Sections/SectionsUpdatePage';
import SectionWritePage from './Sections/SectionWritePage';
import { SectionsBiographie } from './Sections/SectionsBiographie';
import SectionsSingleScreen from './Sections/SectionsSingleScreen';
import PresiSectionByCategoryListPage from './PresiDeSections/PresiSectionByCategoryListPage';
import PresiSectionWritePage from './PresiDeSections/PresiSectionWritePage';
import PresiSectionListPage from './PresiDeSections/PresiSectionListPage';
import PresiSectionSingleScreen from './PresiDeSections/PresiSectionSingleScreen';
import PresiNationalListPage from './PresiNational/PresiNationalListPage';
import PresiNationalSingleScreen from './PresiNational/PresiNationalSingleScreen';
import PresiNationalWritePage from './PresiNational/PresiNationalWritePage';

//Fonction Layout
const Layout = () => {
  return (
    <>
      <Menu />
      <Outlet />
      <Footer />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <HomeScreen />,
      },
      {
        path: '/historique',
        element: <HistoriqueScreen />,
      },

      // Debut Post
      {
        path: '/write',
        element: <WriteScreen />,
      },
      {
        path: '/post/:id',
        element: <SinglePostScreen />,
      },
      //Fin Post

      //Debut User
      {
        path: '/usersList',
        element: <UsersListPage />,
      },
      {
        // Modifier un utilisateur
        path: '/updateUser/:id',
        element: <UsersUpdatePage />,
      },
      //Fin User

      //Debut Section
      {
        // Afficher les Posts de Section par Categories
        path: '/sectionsList',
        element: <SectionsListPage />,
      },

      {
        // Modifier une Section
        path: '/updateSection/:id',
        element: <SectionsUpdatePage />,
      },
      {
        // Créer Intro de la section
        path: '/writeSection',
        element: <SectionWritePage />,
      },
      {
        // Liste des Intro Section (Biographie)
        path: '/sectionBiographie',
        element: <SectionsBiographie />,
      },

      {
        //Post single d'une section
        path: '/section/:id',
        element: <SectionsSingleScreen />,
      },

      {
        // Afficher les Posts de Section par Categories
        path: '/ByCategoryp/:id',
        element: <PostSectionByCategory />,
      },
      //Fin Section

      // Debut CategorieSection
      {
        // Liste des catégorieSection
        path: '/catSectionList',
        element: <CategorieSectionListPage />,
      },
      {
        // Modifier une catégorieSection
        path: '/updateCatSection/:id',
        element: <CategorieSectionUpdatePage />,
      },

      {
        // Créer une catégorieSection
        path: '/addCatSection',
        element: <CategorieSectionCreatePage />,
      },
      // Fin CategorieSection
      {
        // Afficher les Posts de Section par Categories (a revoir cette route)
        path: '/PresiSectionByCategory/:id',
        element: <PresiSectionByCategoryScreen />,
      },
      //Debut Presi Section
      {
        // Afficher les présidents de cette section
        path: '/presiSectionByCategoryList/:id',
        element: <PresiSectionByCategoryListPage />,
      },
      {
        // Créer les infos sur un président de section(titre image cat et desc)
        path: '/writeBiographiePresiSection',
        element: <PresiSectionWritePage />,
      },
      {
        // Liste de tous les présidents de section
        path: '/PresiSectionList',
        element: <PresiSectionListPage />,
      },
      {
        // Page pour un seul president de section
        path: '/presiSection/:id',
        element: <PresiSectionSingleScreen />,
      },
      //Fin Presi Section

      //Debut PresiNational
      {
        // Liste des presidents nationaux
        path: '/presiNationalList',
        element: <PresiNationalListPage />,
      },
      {
        // Page pour un seul president National
        path: '/presiNational/:id',
        element: <PresiNationalSingleScreen />,
      },
      {
        // Créer les infos sur un président national(titre image cat et desc)
        path: '/writeBiographiePresiNational',
        element: <PresiNationalWritePage />,
      },
      //Fin PresiNational
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },

  {
    path: '/register',
    element: <Register />,
  },
]);
function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
