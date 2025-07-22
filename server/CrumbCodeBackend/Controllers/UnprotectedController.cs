using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CrumbCodeBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UnprotectedController : BaseController
    {
        public UnprotectedController(
            IConfiguration configuration,
            ITokenService tokenService
        ) : base(configuration, tokenService)
        {
            
        }

    }
}