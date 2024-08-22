using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Account
{
    public class AddUserToRoleDto
    {
        public string Username { get; set; } = null!;
        public string Role { get; set; } = null!;
    }
}