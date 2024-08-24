import React from 'react'
import { 
  createBrowserRouter, 
  RouterProvider
} from 'react-router-dom'
import Cookies from 'js-cookie';
import LoginPage from './pages/LoginPage';

const App = () => {
  const loginUser = async(username, password) => {
    try {
      const res = await fetch("/api/account/login",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            }),
        }
    );
    if(res.ok)
    {
      const data = await res.json();
      const token = data.token;
      Cookies.set('token', token, { expires: 7});
      console.log(Cookies.get('token'));
    }
    
    } catch (error) {
      console.log(error);
    }
    
    return;
}

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage loginUser={loginUser}/>
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App