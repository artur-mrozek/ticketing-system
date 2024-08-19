using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Address { get; set; } = null!;
        public List<TicketModel> Tickets { get; set; } = new List<TicketModel>();
        public List<Comment> Comments { get; set; } = new List<Comment>();
    }
}