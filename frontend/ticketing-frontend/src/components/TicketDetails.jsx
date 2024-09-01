import React from 'react'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TicketDetails = ({ticket, convertDateTime, getUserRoles, fetchTicket, getUsername}) => {
  const navigate = useNavigate();
  const userRoles = getUserRoles();
  const username = getUsername();

  const takeTicket = async () => {
    try {
      const res = await fetch(`/api/ticket/${ticket.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get("token")}`
      },
      body: JSON.stringify({
        "isTaking": true
        })
      })
      if (res.ok) {
        fetchTicket();
        toast.success("You took the ticket succesfully!")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const escalateTicket = async () => {
    let newTicketLine;
    if (ticket.line == "L1") {
      newTicketLine = "L2";
    }
    if (ticket.line == "L2") {
      newTicketLine = "L3";
    }
    try {
      const res = await fetch(`/api/ticket/${ticket.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get("token")}`
        },
        body: JSON.stringify({
          "line": newTicketLine
        })
      })
      if (res.ok) {
        navigate("/tickets");
        toast.success(`Ticket escalated to ${newTicketLine} support!`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Ticket Details</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><strong>ID:</strong> {ticket.id}</div>
          <div><strong>Category:</strong> {ticket.category}</div>
          <div><strong>Title:</strong> {ticket.title}</div>
          <div><strong>Description:</strong> {ticket.description}</div>
          <div><strong>Created On:</strong> {convertDateTime(ticket.createdOn)}</div>
          <div><strong>Username:</strong> {ticket.userName}</div>
          <div><strong>First Name:</strong> {ticket.firstName}</div>
          <div><strong>Last Name:</strong> {ticket.lastName}</div>
          <div><strong>Address:</strong> {ticket.address}</div>
          <div><strong>Phone Number:</strong> {ticket.phoneNumber}</div>
          <div><strong>Email:</strong> {ticket.email}</div>
          <div><strong>Status:</strong> {ticket.status}</div>
          <div><strong>Line:</strong> {ticket.line}</div>
          <div><strong>Owner:</strong> {ticket.owner}</div>
          <div><strong>Priority:</strong> {ticket.priority}</div>
        </div>

        {/* Przycisk Edit oraz Take */}
        {userRoles.includes("L1") || userRoles.includes("L2") || userRoles.includes("L3")
        ?(
          <div className="mt-6 flex space-x-4">
            <button className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
            {username == ticket.owner 
            ?
              <button disabled className="bg-gray-300 text-white px-4 py-2 rounded cursor-not-allowed">Take</button>
            :
              <button  onClick={() => {takeTicket()}} className="bg-green-600 text-white px-4 py-2 rounded">Take</button>
            }
            {ticket.line == "L3"
            ?
              <button disabled className="bg-gray-300 text-white px-4 py-2 rounded cursor-not-allowed">Escalate</button>
            :
              <button onClick={() => {escalateTicket()}} className="bg-red-600 text-white px-4 py-2 rounded">Escalate</button>
            }
          </div>
        )
        : ""}
      </div>
  )
}

export default TicketDetails