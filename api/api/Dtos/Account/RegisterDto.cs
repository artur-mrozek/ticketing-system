using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Account
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; } = null!;
        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;
        [Required]
        [Phone]
        public string PhoneNumber { get; set; } = null!;
        [Required]
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Use letters only please")]
        [MaxLength(40, ErrorMessage = "First name cannot be over 40 characters")]
        public string FirstName { get; set; } = null!;
        [Required]
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Use letters only please")]
        [MaxLength(40, ErrorMessage = "Last name cannot be over 40 characters")]
        public string LastName { get; set; } = null!;
        [Required]
        [MaxLength(200, ErrorMessage = "Address cannot be over 200 characters")]
        public string Address { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;
    }
}