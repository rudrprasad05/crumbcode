using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CrumbCodeBackend.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("[controller]")]
    public class ProtectedController : BaseController
    {
        public ProtectedController(
            IConfiguration configuration,
            ITokenService tokenService
        ) : base(configuration, tokenService)
        {
            
        }

    }
}