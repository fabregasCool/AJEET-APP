import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { HomeScreen } from './screens/HomeScreen';
import Footer from './Components/Footer';
import Menu from './Components/Menu';

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
import { DashboardScreen } from './screens/DashboardScreen';
import { AjeetNtleBiographie } from './AjeetNationale/AjeetNtleBiographie';
import AjeetNtleSingleScreen from './AjeetNationale/AjeetNtleSingleScreen';
import AjeetNtleWritePage from './AjeetNationale/AjeetNtleWritePage';

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
        path: '/',
        element: <HomeScreen />,
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
        // Afficher toutes les Section (En réalité c'est les categories qu'on affiche; car une catégorie represente ici une section)
        path: '/sectionsList',
        element: <SectionsListPage />,
      },

      {
        // Modifier une Section (En réalité c'est la categorie on modifie; car une catégorie represente ici une section)
        path: '/updateSection/:id',
        element: <SectionsUpdatePage />,
      },
      {
        // Créer Intro de la section
        path: '/writepostSections',
        element: <SectionWritePage />,
      },
      {
        // Liste des Intro Section (Biographie)
        path: '/postSectionsBiographie',
        element: <SectionsBiographie />,
      },

      {
        //Post single d'une section
        path: '/postSections/:id',
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
        // Modifier une catégorieSection (ça represente aussi la section car ici section==catSection)
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

      //AJEET NTIOONALE
      {
        //  Biographie de l'AJEET NATIONALE
        path: '/postAjeetNtleBiographie',
        element: <AjeetNtleBiographie />,
      },
      {
        //Post single de l'AJEET Nationale
        path: '/postAjeetNtle/:id',
        element: <AjeetNtleSingleScreen />,
      },
      {
        // Créer Intro de la section
        path: '/writepostAjeetNtle',
        element: <AjeetNtleWritePage />,
      },
    ],
  },
  // Les éléments ici n'auront pas le menu
  {
    path: '/login',
    element: <Login />,
  },

  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: <DashboardScreen />,
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
