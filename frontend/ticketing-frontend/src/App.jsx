import React from 'react'
import { 
  createBrowserRouter, 
  RouterProvider
} from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';

const App = () => {

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
          element: <HomePage />
        }
      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App