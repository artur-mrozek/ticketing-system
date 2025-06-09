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
import EditTicket from './pages/EditTicket';
import AdminPanel from './pages/AdminPanel';
import UserDetails from './pages/UserDetails';
import ChangePassword from './pages/ChangePassword';
import ErrorPage from './pages/ErrorPage';

const App = () => {
  const getUserRoles = () => {
    const token = Cookies.get("token")
    if (token) {
      const decodedToken = jwtDecode(token);
      const roles = decodedToken.Role;
      return roles;
    }

    return [];
  }

  const getUsername = () => {
    const token = Cookies.get("token")
    if (token) {
      const decodedToken = jwtDecode(token);
      const username = decodedToken.given_name;
      return username;
    }

    return "";
  }

  const convertDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);

    // Pobierz poszczególne części daty i czasu
    const day = String(date.getDate()).padStart(2, '0'); // Dzień
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Miesiąc (getMonth zwraca 0-11, więc trzeba dodać 1)
    const year = date.getFullYear(); // Rok

    const hours = String(date.getHours()).padStart(2, '0'); // Godzina
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Minuty

    // Zbuduj nowy ciąg w formacie "DD-MM-RRRR HH:MM"
    const formattedDateTime = `${day}.${month}.${year} ${hours}:${minutes}`;

    return formattedDateTime;
  }

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/register",
      element: <RegisterPage />
    },
    {
      path: "/",
      element: <MainLayout getUserRoles={getUserRoles} />,
      children: [
        {
          path: "/",
          element: <HomePage getUserRoles={getUserRoles} />
        },
        {
          path: "/send-ticket",
          element: <SendTicket />
        },
        {
          path: "/tickets",
          element: <TicketsList convertDateTime={convertDateTime} getUserRoles={getUserRoles} />
        },
        {
          path: "/ticket/:id",
          element: <TicketDetailsPage convertDateTime={convertDateTime} getUserRoles={getUserRoles} getUsername={getUsername} />
        },
        {
          path: "/edit-ticket/:id",
          element: <EditTicket getUserRoles={getUserRoles} />
        },
        {
          path: "/change-password",
          element: <ChangePassword />
        },
        {
          path: "/admin",
          element: <AdminPanel />
        },
        {
          path: "/admin/user/:username",
          element: <UserDetails />
        },
        {
          path: "*",
          element: <ErrorPage />
        }
      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App