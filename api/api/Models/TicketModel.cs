using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class TicketModel
    {
        public int Id { get; set; }
        public string Category { get; set; } = null!;
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public string AppUserId { get; set; } = null!;
        public AppUser AppUser { get; set; } = null!;
        public bool IsDone { get; set; } = false;
        public string Line { get; set; } = "L1";
        public string? Owner { get; set; } = null!;
        public int Priority { get; set; } = 4;
        public List<Comment> Comments { get; set; } = new List<Comment>();
    }
    
}