using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;

namespace api.Repository
{
    public class TicketRepository : ITicketRepository
    {
        private readonly ApplicationDBContext _context;

        public TicketRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<TicketModel> Create(TicketModel ticket)
        {
            await _context.TicketModels.AddAsync(ticket);
            await _context.SaveChangesAsync();
            return ticket;
        }
    }
}