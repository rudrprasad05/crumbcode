using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrumbCodeBackend.DTO
{
    public class AuthDto
    {
        public class RegisterDto
        {
            public string Username = string.Empty;
            public string Email = string.Empty;
            public string Password = string.Empty;
        }
    }
}