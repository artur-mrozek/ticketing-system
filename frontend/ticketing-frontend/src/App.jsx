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
import RegisterPage from './pages/RegisterPage';
import SendTicket from './pages/SendTicket';
import TicketsList from './pages/TicketsList';
import TicketDetailsPage from './pages/TicketDetailsPage';

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
      path: "/register",
      element: <RegisterPage/>
    },
    {
      path: "/",
      element: <MainLayout getUserRoles={getUserRoles}/>,
      children: [
        {
          path: "/",
          element: <HomePage getUserRoles={getUserRoles}/>
        },
        {
          path: "/send-ticket",
          element: <SendTicket />
        },
        {
          path: "/tickets",
          element: <TicketsList />
        },
        {
          path: "/ticket/:id",
          element: <TicketDetailsPage />
        }
      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App