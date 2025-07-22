using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.DTO;
using CrumbCodeBackend.Interfaces;
using CrumbCodeBackend.Models.Requests;
using CrumbCodeBackend.Models.Response;
using Microsoft.AspNetCore.Mvc;

namespace CrumbCodeBackend.Controllers
{
    [Route("api/site")]
    [ApiController]
    public class SiteController : UnprotectedController
    {
        private readonly ICakeRepository _cakeRepository;

        public SiteController(
            ICakeRepository cakeRepository,
            IConfiguration configuration,
            ITokenService tokenService
        ) : base(configuration, tokenService)
        {
            _cakeRepository = cakeRepository;

        }

        [HttpGet("get-all-cakes")]
        public async Task<IActionResult> GetAllCakes([FromQuery] CakeQueryObject queryObject)
        {
            var model = await _cakeRepository.GetAllAsync(queryObject);

            if (model == null)
            {
                return BadRequest(new ApiResponse<List<CakeDto>>
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