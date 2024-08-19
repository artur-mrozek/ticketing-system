using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; } = null!;
        public int MyProperty { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public int? TicketModelId { get; set; }
        public TicketModel? TicketModel { get; set; }
        public string? AppUserId { get; set;}
        public AppUser? AppUser { get; set; }
    }
}