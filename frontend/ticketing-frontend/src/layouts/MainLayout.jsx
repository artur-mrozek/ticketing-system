import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
        <div>Navbar</div>
        <Outlet />
    </>
  )
}

export default MainLayout