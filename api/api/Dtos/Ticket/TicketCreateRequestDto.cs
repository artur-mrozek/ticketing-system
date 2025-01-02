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
        [RegularExpression("Software Issues|Hardware Malfunctions|Network Connectivity|Password Reset|Security Breach|Performance Issues|System Updates|Data Backup and Recovery|User Access Management", ErrorMessage = "Invalid category")]
        public string Category { get; set; } = null!;
        [MaxLength(60, ErrorMessage = "Title cannot be over 60 characters")]
        public string Title { get; set; } = null!;
        [MaxLength(2500, ErrorMessage = "Description cannot be over 2500 characters")]
        public string Description { get; set; } = null!;
        [RegularExpression("1|2|3|4", ErrorMessage = "Invalid priority")]
        public int Priority { get; set; } = 4;
    }
}