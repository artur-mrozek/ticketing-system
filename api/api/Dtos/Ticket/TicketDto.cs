using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Ticket
{
    public class TicketDto
    {
        public int Id { get; set; }
        public string Category { get; set; } = null!;
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime CreatedOn { get; set; } 
        public string CreatedBy { get; set; } = null!;
    }
}