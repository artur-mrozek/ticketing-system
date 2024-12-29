import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaUser } from "react-icons/fa";

const NavBar = ({ getUserRoles }) => {
  const navigate = useNavigate();
  const userRoles = getUserRoles();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const logOut = () => {
    Cookies.remove("token");
    navigate("/login");
    return;
  }

  // Detect clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-blue-600 p-4 fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-white text-lg font-semibold hover:bg-blue-700 px-3 py-2 rounded-md">
            Home
          </Link>
          {userRoles.includes("L1") || userRoles.includes("L2") || userRoles.includes("L3") ? (
            ""
          ) : (
            <Link to="/tickets" className="text-white text-lg font-semibold hover:bg-blue-700 px-3 py-2 rounded-md">
              My Tickets
            </Link>
          )}
          {userRoles.includes("Admin") ? (
            <Link to="/admin" className="text-white text-lg font-semibold bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md">
              Admin
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className="relative" ref={menuRef}>
          <button
            className="text-white text-lg font-semibold hover:bg-blue-700 px-3 py-2 rounded-md"
            onClick={() => setShowMenu(!showMenu)}
          >
            <FaUser />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-48">
              <ul>
                <li>
                  <button
                    onClick={() => {navigate('/change-password'); setShowMenu(false);}}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Change Password
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {logOut(); setShowMenu(false);}}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
