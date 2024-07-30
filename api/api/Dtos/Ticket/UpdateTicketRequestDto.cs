using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Ticket
{
    public class UpdateTicketRequestDto
    {
        [MaxLength(40, ErrorMessage = "Category cannot be over 40 characters")]
        public string? Category { get; set; }
        [MaxLength(60, ErrorMessage = "Title cannot be over 60 characters")]
        public string? Title { get; set; }
        [MaxLength(2500, ErrorMessage = "Description cannot be over 2500 characters")]
        public string? Description { get; set; }
        public bool? IsDone { get; set; }
        [RegularExpression("L1|L2|L3", ErrorMessage = "Invalid line of support")]
        public string? Line { get; set; } 
        public bool IsTaking { get; set; } = false;
    }
}