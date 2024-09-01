import React from 'react'
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const SendTicket = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get("category");
    const [category, setCategory] = useState(categoryParam);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [errorState, setErrorState] = useState([]);
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/ticket",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get("token")}`
                    },
                    body: JSON.stringify({
                        "category": category,
                        "title": title,
                        "description": description,
                        "priority": priority
                    })
                }
            )
            if (!res.ok){
              const errorResponseJson = await res.json();
              const errorsJson = errorResponseJson.errors;
              var errors = [];
              for (var errorKey in errorsJson) {
                  errors.push(`${errorsJson[errorKey]}`);
              }
              setErrorState(errors);
            }
        } catch (error) {
            console.log(error);
        }
        toast.success('Ticket sent successfully!');
        navigate("/tickets")
        return;
      };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center pt-16">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Submit a Ticket</h2>
            <form onSubmit={submitForm}>
                <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                </label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200"
                />
                </div>
    
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  maxLength={60}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
    
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  maxLength={2500}
                  className="resize-none mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                />
              </div>
    
              <div className="mb-4">
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Priority</option>
                  <option value="1">1 - Low</option>
                  <option value="2">2 - Medium</option>
                  <option value="3">3 - High</option>
                  <option value="4">4 - Critical</option>
                </select>
              </div>

              {errorState.map(error => <p className="mb-5 text-red-500 font-medium">{error}</p>)}
    
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Submit Ticket
              </button>
            </form>
          </div>
        </div>
      );
}

export default SendTicket