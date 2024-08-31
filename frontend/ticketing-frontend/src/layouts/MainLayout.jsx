import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = ({getUserRoles}) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login")
    }
  },[]);

  return (
    <>
        <NavBar getUserRoles={getUserRoles}/>
        <Outlet />
        <ToastContainer />
    </>
  )
}

export default MainLayout