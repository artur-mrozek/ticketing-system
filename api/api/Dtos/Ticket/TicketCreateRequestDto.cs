using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace api.Dtos.Ticket
{
    public class TicketCreateRequestDto
    {
        [MaxLength(40, ErrorMessage = "Category cannot be over 40 characters")]
        public string Category { get; set; } = null!;
        [MaxLength(60, ErrorMessage = "Category cannot be over 60 characters")]
        public string Title { get; set; } = null!;
        [MaxLength(2500, ErrorMessage = "Category cannot be over 2500 characters")]
        public string Description { get; set; } = null!;
    }
}