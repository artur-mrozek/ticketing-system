import React from 'react'
import { 
  createBrowserRouter, 
  RouterProvider
} from 'react-router-dom'
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import LoginPage from './pages/LoginPage';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';

const App = () => {
  const getUserRoles = () => {
    const token = Cookies.get("token")
    if (token)
    {
      const decodedToken = jwtDecode(token);
      const roles = decodedToken.Role;
      return roles;
    }

    return [];
  }

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage/>
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <HomePage getUserRoles={getUserRoles}/>
        }
      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App