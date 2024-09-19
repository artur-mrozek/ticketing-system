import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import Spinner from '../components/Spinner';

const TicketsList = ({convertDateTime}) => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const lineParam = searchParams.get("Line");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTickets = async () => {
        try {
            if (lineParam == "L1" || lineParam == "L2" || lineParam == "L3"){
            const res = await fetch(`api/ticket?Line=${lineParam}`,{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get("token")}`
                }
            })
        
            const data = await res.json();
            setTickets(data);
          } else {
            const res = await fetch(`api/ticket`,{
              method: "GET",
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${Cookies.get("token")}`
              }
          })
      
          const data = await res.json();
          setTickets(data);
          }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    fetchTickets();
    }, [])
    
      return (
        <div className="bg-gray-100 min-h-screen p-8 pt-24">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Tickets List</h1>
          {loading
              ? <Spinner loading={loading} />
              :
          <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Created On</th>
                  <th className="px-4 py-2">User Name</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Owner</th>
                  <th className="px-4 py-2">Priority</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr onClick={() => {navigate(`/ticket/${ticket.id}`)}} key={ticket.id} className="text-center hover:bg-gray-100 cursor-pointer">
                    <td className="border px-4 py-2">{ticket.id}</td>
                    <td className="border px-4 py-2">{ticket.category}</td>
                    <td className="border px-4 py-2">{ticket.title}</td>
                    <td className="border px-4 py-2">{convertDateTime(ticket.createdOn)}</td>
                    <td className="border px-4 py-2">{ticket.userName}</td>
                    <td
                      className={`border px-4 py-2 ${
                        ticket.status === 'Closed'
                          ? 'text-green-600'
                          : ticket.status === 'In Progress'
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}
                    >
                      {ticket.status}
                    </td>
                    <td className="border px-4 py-2">{ticket.owner}</td>
                    <td className="border px-4 py-2">{ticket.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          }
        </div>
      );
}

export default TicketsList