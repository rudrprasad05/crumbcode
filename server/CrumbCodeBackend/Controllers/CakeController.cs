using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.Controllers;
using CrumbCodeBackend.Interfaces;
using CrumbCodeBackend.Models;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;


namespace CrumbCodeBackend.Controllers
{
    [Route("api/cake")]
    [ApiController]
    public class CakeController : BaseController
    {
        private readonly ICakeRepository _cakeRepository;

        public CakeController(ICakeRepository cakeRepository)
        {
            _cakeRepository = cakeRepository;
        }

       [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var model = await _cakeRepository.GetAllAsync();

            if (model == null)
            {
                return BadRequest("model not created");
            }

            return Ok(model);
            
        }

    }
}