import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginPage = ({loginUser}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();
        loginUser(username, password)
        return navigate("/");
    }

    return (
        <>
            <section className="bg-gray-100 flex items-center justify-center min-h-screen">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
                    <form onSubmit={submitForm}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input 
                                type="text" 
                                id="username" 
                                name="username" 
                                required
                                value={username}
                                onChange={(e) => {setUsername(e.target.value)}}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                required
                                value={password}
                                onChange={(e) => {setPassword(e.target.value)}}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            Sign In
                        </button>
                        <div className="mt-4 text-center">
                            <span className="text-sm text-gray-600 mr-1">Don't have an account?</span>
                            <a href="#" className="text-sm text-blue-600 hover:text-blue-500 font-medium">Register</a>
                        </div>
                    </form>
                </div>
            </section>
        </>
      )
}

export default LoginPage