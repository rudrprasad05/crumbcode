using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.Controllers;
using CrumbCodeBackend.Interfaces;
using CrumbCodeBackend.Models;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;
using static CrumbCodeBackend.Models.Requests.CakeTypeRequestObject;

namespace CrumbCodeBackend.Controllers
{
    [Route("api/caketype")]
    [ApiController]
    public class CakeTypeController : BaseController
    {
        private readonly ICakeTypeRepository _cakeTypeRepository;

        public CakeTypeController(ICakeTypeRepository cakeTypeRepository, IConfiguration configuration, 
            ITokenService tokenService
        )  : base(configuration, tokenService)
        {
            _cakeTypeRepository = cakeTypeRepository;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateCakeType([FromBody] NewCakeTypeRequest newCakeTypeRequest)
        {
            var model = await _cakeTypeRepository.CreateAsync(newCakeTypeRequest);

            if (model == null)
            {
                return BadRequest("model not created");
            }

            return Ok(model);

        }
        
        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var model = await _cakeTypeRepository.GetAllAsync();

            if (model == null)
            {
                return BadRequest("model not created");
            }

            return Ok(model);
            
        }

    }
}