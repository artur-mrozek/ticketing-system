import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';


const EditTicket = ({ getUserRoles }) => {
    const userRoles = getUserRoles();
    const navigate = useNavigate();

    const { id } = useParams();
    const [ticket, setTicket] = useState([]);
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [errorState, setErrorState] = useState([]);

    const categories = [
        'Software Issues',
        'Hardware Malfunctions',
        'Network Connectivity',
        'Password Reset',
        'Security Breach',
        'Performance Issues',
        'System Updates',
        'Data Backup & Recovery',
        'User Access Management'
      ];

    const fetchTicket = async () => {
        try {
            const res = await fetch(`/api/ticket/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get("token")}`
                }
            })
            if (res.ok) {
                const data = await res.json();
                setTicket(data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
      if(!userRoles.includes("L1") && !userRoles.includes("L2") && !userRoles.includes("L3"))
        {
          navigate("/");
          return;
        }
      fetchTicket();
    },[])

    useEffect(() => {
        // Ustawia wartości pól formularza po pobraniu ticketa
        if (ticket) {
            setCategory(ticket.category || '');
            setTitle(ticket.title || '');
            setDescription(ticket.description || '');
            setPriority(ticket.priority || '');
        }
    }, [ticket]);

      const submitForm = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/ticket/${id}`,
                {
                    method: "PUT",
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
              return
            }
            toast.success('Ticket edited successfully!');
            navigate(-1)
            return;
        } catch (error) {
            console.log(error);
        } 
      };
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center pt-16">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit a Ticket</h2>
            <form onSubmit={submitForm}>
                <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                </label>
                <select
                    type="text"
                    id="category"
                    name="category"
                    value={category || ""}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                    {categories.map(category => <option value={category}>{category}</option>)}
                    </select>
                </div>
    
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title || ""}
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
                  value={description || ""}
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
                  value={priority || ""}
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
                Edit Ticket
              </button>
            </form>
          </div>
        </div>
      );
}

export default EditTicket