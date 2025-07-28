using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.Interfaces;
using CrumbCodeBackend.Middleware;
using Microsoft.AspNetCore.Mvc;

namespace CrumbCodeBackend.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        protected readonly IConfiguration _configuration;
        protected readonly ITokenService _tokenService;

        public BaseController(IConfiguration configuration, ITokenService tokenService)
        {
            _configuration = configuration;
            _tokenService = tokenService;
        }
        protected string? UserId => HttpContext.Items["UserId"]?.ToString();

        [HttpDelete("{uuid}")]
        public virtual Task<IActionResult> SafeDelete([FromRoute] string uuid)
        {
            return Task.FromResult<IActionResult>(NotFound());
        }
    }
}