using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface ITicketRepository
    {
        public Task<TicketModel> Create(TicketModel ticket);
    }
}