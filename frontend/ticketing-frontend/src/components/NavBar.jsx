import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const NavBar = ({getUserRoles}) => {
  const navigate = useNavigate();
  const userRoles = getUserRoles();

  const logOut = () => {
    Cookies.remove("token");
    navigate("/login");
    return;
  }

  return (
    <nav className="bg-blue-600 p-4 fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-white text-lg font-semibold hover:bg-blue-700 px-3 py-2 rounded-md">
            Home
          </Link>
          {userRoles.includes("L1") || userRoles.includes("L2") || userRoles.includes("L3")
          ?
            ""
          :
            <Link to="/tickets" className="text-white text-lg font-semibold hover:bg-blue-700 px-3 py-2 rounded-md">
                My Tickets
            </Link>
          }
          {userRoles.includes("Admin")
            ?
              <Link to="/admin" className="text-white text-lg font-semibold hover:bg-blue-700 px-3 py-2 rounded-md">
                  Admin
              </Link>
            :
              ""
          }
        </div>
        <div>
          <button onClick={() => {logOut()}} className="text-white text-lg font-semibold hover:bg-blue-700 px-3 py-2 rounded-md">
            Log Out
          </button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar