import React from 'react'
import { useNavigate} from "react-router-dom";
import { useState } from 'react';

const AdminPanel = () => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
  
    const handleSearch = async (e) => {
      e.preventDefault();
      navigate(`/admin/user/${username}`)
    }

  
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Search User</h1>
          <form onSubmit={handleSearch} className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    );
  };
  

export default AdminPanel