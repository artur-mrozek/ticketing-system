import React from 'react'
import { useNavigate } from "react-router-dom";

const HomePage = ({getUserRoles}) => {
    const navigate = useNavigate();
    const userRoles = getUserRoles()
    const categories = [
      { name: 'Software Issues', icon: '💻' },
      { name: 'Hardware Malfunctions', icon: '🔧' },
      { name: 'Network Connectivity', icon: '🌐' },
      { name: 'Password Reset', icon: '🔑' },
      { name: 'Security Breach', icon: '🔒' },
      { name: 'Performance Issues', icon: '⚡' },
      { name: 'System Updates', icon: '🔄' },
      { name: 'Data Backup and Recovery', icon: '💾' },
      { name: 'User Access Management', icon: '👥' },
    ];
    
    if(userRoles.includes("L1") || userRoles.includes("L2") || userRoles.includes("L3"))
    {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Select a Support Queue</h1>
          
          <div className="space-y-4">
            {/* Line 1 */}
            {userRoles.includes("L1") ?
            <button 
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              onClick={() => {navigate("/tickets?Line=L1")}}
            >
              Line 1
            </button>
            : "" }
            {/* Line 2 */}
            {userRoles.includes("L2") ?
            <button 
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              onClick={() => {navigate("/tickets?Line=L2")}}
            >
              Line 2
            </button>
            : ""}
            {/* Line 3 */}
            {userRoles.includes("L3") ?
            <button 
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              onClick={() => {navigate("/tickets?Line=L3")}}
            >
              Line 3
            </button>
            : ""}
          </div>
        </div>
      </div>
      );
    } else 
    {
      return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center pt-16">
          <h1 className="text-3xl font-bold text-gray-800 mt-8 mb-6">Select a Technical Support Category</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl px-4">
            {categories.map((category, index) => (
              <button onClick={() => {navigate(`/send-ticket?category=${category.name}`)}}
                key={index}
                className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center hover:bg-blue-100 transition duration-200 cursor-pointer"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h2 className="text-xl font-semibold text-gray-700">{category.name}</h2>
              </button>
            ))}
          </div>
        </div>
      );
    }
}

export default HomePage