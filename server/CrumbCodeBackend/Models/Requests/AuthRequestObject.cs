using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CrumbCodeBackend.Models.Requests
{
    public class AuthRequestObject
    {
        public class RegisterRequest
        {
            [Required] public string Email { get; set; } = string.Empty;
            [Required] public string Username { get; set; } = string.Empty;
            [Required] public string Password { get; set; } = string.Empty;
        }

        public class LoginRequest
        {
            [Required] public string Email { get; set; } = string.Empty;
            [Required] public string Password { get; set; } = string.Empty;
        }
    }
}