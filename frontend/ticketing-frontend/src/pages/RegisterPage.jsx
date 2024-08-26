import React, { useState } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { HiQuestionMarkCircle } from "react-icons/hi";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errorState, setErrorState] = useState("");

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch("api/account/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify({
                "username": username,
                "email": email,
                "phoneNumber": phoneNumber,
                "firstName": firstName,
                "lastName": lastName,
                "address": address,
                "password": password
            }),
        })

        if(res.ok)
            {
              const data = await res.json();
              const token = data.token;
              Cookies.set('token', token, { expires: 7});
              return  navigate("/");
            } 
        else if(res.status == 500) {
              const errorResponse = "Password doesn't match requirements";
              setErrorState(errorResponse);
              //console.log(errorResponse);
            } 
        else if (res.status == 400) {
              const errorResponseJson = await res.json();
              const errorsJson = errorResponseJson.errors;
              var errors = [];
              for (var errorKey in errorsJson) {
                  errors.push(`${errorsJson[errorKey]}`);
              }
              //console.log(errors);
              setErrorState(errors);
            }
    } catch (error) {
        console.log(error);
    }

    return;
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
    <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>
      <form onSubmit={submitForm}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => {setUsername(e.target.value)}}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={phoneNumber}
            onChange={(e) => {setPhoneNumber(e.target.value)}}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            required
            value={firstName}
            onChange={(e) => {setFirstName(e.target.value)}}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            required
            value={lastName}
            onChange={(e) => {setLastName(e.target.value)}}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            value={address}
            onChange={(e) => {setAddress(e.target.value)}}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center">
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="ml-2 relative group">
                <HiQuestionMarkCircle size={25} className="text-gray-500 cursor-default relative z-10" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-700 text-white text-sm rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-0">
                    A secure password should contain at least 12 characters, including uppercase, lowercase, numbers, and special characters.
                </div>
              </div>
            </div>
          </div>
        {Array.isArray(errorState)
            ? errorState.map(error => <p className="mb-5 text-red-500 font-medium">{error}</p>)
            : <p className="mb-5 text-red-500 font-medium">{errorState}</p>}
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Register
        </button>
      </form>
    </div>
  </div>
  )
}

export default RegisterPage