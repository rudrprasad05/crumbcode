using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace CrumbCodeBackend.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user); 
        public string? GetUserIdFromToken(HttpContext httpContext);
    }
}