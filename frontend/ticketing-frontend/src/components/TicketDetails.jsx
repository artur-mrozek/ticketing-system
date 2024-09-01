import React from 'react'

const TicketDetails = ({ticket, convertDateTime}) => {
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
        <div className="mt-6 flex space-x-4">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded">Take</button>
          <button className="bg-red-600 text-white px-4 py-2 rounded">Escalate</button>
        </div>
      </div>
  )
}

export default TicketDetails