using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Ticket;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class TicketRepository : ITicketRepository
    {
        private readonly ApplicationDBContext _context;

        public TicketRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<TicketModel>> GetAll()
        {
            return await _context.TicketModels.Include(t => t.AppUser).ToListAsync();
        }

        public async Task<TicketModel?> GetById(int id)
        {
            return await _context.TicketModels.Include(t => t.AppUser).FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<TicketModel> Create(TicketModel ticket)
        {
            await _context.TicketModels.AddAsync(ticket);
            await _context.SaveChangesAsync();
            return ticket;
        }

        public async Task<TicketModel?> Update(int id, UpdateTicketRequestDto ticketDto)
        {
            var existingTicket = await _context.TicketModels.Include(t => t.AppUser).FirstOrDefaultAsync(t => t.Id == id);

            if (existingTicket == null)
            {
                return null;
            }

            if (!string.IsNullOrWhiteSpace(ticketDto.Category))
            {
                existingTicket.Category = ticketDto.Category;
            }
            if (!string.IsNullOrWhiteSpace(ticketDto.Title))
            {
                existingTicket.Title = ticketDto.Title;
            }
            if (!string.IsNullOrWhiteSpace(ticketDto.Description))
            {
                existingTicket.Description = ticketDto.Description;
            }

            await _context.SaveChangesAsync();

            return existingTicket;
        }
    }
}