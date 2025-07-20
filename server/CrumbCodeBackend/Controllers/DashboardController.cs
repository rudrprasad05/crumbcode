using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.DTO;
using CrumbCodeBackend.Interfaces;
using CrumbCodeBackend.Models.Response;
using Microsoft.AspNetCore.Mvc;

namespace CrumbCodeBackend.Controllers
{
    [Route("api/dashboard")]
    [ApiController]
    public class DashboardController : ProtectedController
    {
        private readonly IDashboardRepository _dashboardRepository;

        public DashboardController(
            IConfiguration configuration,
            ITokenService tokenService,
            IDashboardRepository dashboardRepository
        ) : base(configuration, tokenService)
        {
            _dashboardRepository = dashboardRepository;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetAll()
        {
            var model = await _dashboardRepository.GetDashboard();

            if (model == null)
            {
                return BadRequest(new ApiResponse<List<DashboardDto>>
                {
                    Success = false,
                    StatusCode = 400,
                }
                );
            }

            return Ok(model);

        }
    }
}