using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Ticket;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface ITicketRepository
    {
        public Task<PagedResult<TicketModel>> GetAll(QueryObject query, IList<string> userRoles, AppUser? user);
        public Task<TicketModel?> GetById(int id);
        public Task<TicketModel> Create(TicketModel ticket);
        public Task<TicketModel?> Update(int id, UpdateTicketRequestDto ticketDto, String? user);
        public Task<TicketModel?> Delete(int id);
    }
}