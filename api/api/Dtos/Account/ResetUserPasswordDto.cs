using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Account
{
    public class ResetUserPasswordDto
    {
        public string Username { get; set; } = null!;
        public string NewPassword { get; set; } = null!;
    }
}