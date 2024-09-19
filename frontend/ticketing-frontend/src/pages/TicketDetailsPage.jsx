import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa';
import Cookies from 'js-cookie';
import TicketDetails from '../components/TicketDetails';
import Comments from '../components/Comments';

const TicketDetailsPage = ({convertDateTime, getUserRoles, getUsername}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ticket, setTicket] = useState([]);

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
    fetchTicket();
  },[])

  return (
    <div className="bg-gray-100 min-h-screen p-8 pt-24"> {/* Padding adjusted to account for navigation bar */}
      {/* Przycisk Wstecz */}
      <button 
        className="text-blue-600 flex items-center mb-4"
        onClick={() => navigate(`/tickets?Line=${ticket.line}`)}
      >
        <FaArrowLeft className="mr-2" size={24} /> {/* Ikona strzałki */}
        Back
      </button>

      <TicketDetails 
        ticket={ticket} 
        convertDateTime={convertDateTime} 
        getUserRoles={getUserRoles} 
        fetchTicket={fetchTicket} 
        getUsername={getUsername} />
      <Comments 
        ticket={ticket} 
        fetchTicket={fetchTicket} 
        convertDateTime={convertDateTime} />
    </div>
  );
}

export default TicketDetailsPage