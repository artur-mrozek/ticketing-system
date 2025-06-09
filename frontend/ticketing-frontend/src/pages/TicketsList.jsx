import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Spinner from '../components/Spinner';

const TicketsList = ({ convertDateTime, getUserRoles }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [displayedTicketsStatus, setDisplayedTicketsStatus] = useState("Open");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;

  const lineParam = searchParams.get("Line");
  const userRoles = getUserRoles();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRoles.includes("L1") && !userRoles.includes("L2") && !userRoles.includes("L3")) {
      navigate("/tickets");
    }

    const fetchTickets = async () => {
      setLoading(true);
      try {
        let url = `api/ticket?PageNumber=${currentPage}&PageSize=${pageSize}&Status=${displayedTicketsStatus}`;
        if (lineParam === "L1" || lineParam === "L2" || lineParam === "L3") {
          url += `&Line=${lineParam}`;
        }

        const res = await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get("token")}`
          }
        });

        const data = await res.json();
        setTickets(Array.isArray(data.items) ? data.items : []);
        setTotalCount(data.totalCount || 0);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [displayedTicketsStatus, currentPage]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > maxVisiblePages) {
        pages.push("...");
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages.map((page, idx) =>
      page === "..." ? (
        <span key={`dots-${idx}`} className="px-3 py-1 text-gray-500 select-none">...</span>
      ) : (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1 rounded ${currentPage === page
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800'
            }`}
        >
          {page}
        </button>
      )
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 pt-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {lineParam === "L1" ? "Line 1 Tickets List" :
            lineParam === "L2" ? "Line 2 Tickets List" :
              lineParam === "L3" ? "Line 3 Tickets List" : "Tickets List"}
        </h1>

        <select
          value={displayedTicketsStatus}
          onChange={(e) => {
            setDisplayedTicketsStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <>
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
                  <tr
                    key={ticket.id}
                    onClick={() => navigate(`/ticket/${ticket.id}`)}
                    className="text-center hover:bg-gray-100 cursor-pointer"
                  >
                    <td className="border px-4 py-2">{ticket.id}</td>
                    <td className="border px-4 py-2">{ticket.category}</td>
                    <td className="border px-4 py-2">{ticket.title}</td>
                    <td className="border px-4 py-2">{convertDateTime(ticket.createdOn)}</td>
                    <td className="border px-4 py-2">{ticket.userName}</td>
                    <td className={`border px-4 py-2 ${ticket.status === "Closed"
                        ? "text-green-600"
                        : ticket.status === "In Progress"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}>
                      {ticket.status}
                    </td>
                    <td className="border px-4 py-2">{ticket.owner}</td>
                    <td className="border px-4 py-2">{ticket.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginacja */}
          <div className="flex justify-center mt-6 gap-2 flex-wrap items-center">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-200 text-gray-800 disabled:opacity-50"
            >
              ←
            </button>

            {renderPageNumbers()}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-200 text-gray-800 disabled:opacity-50"
            >
              →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TicketsList;
