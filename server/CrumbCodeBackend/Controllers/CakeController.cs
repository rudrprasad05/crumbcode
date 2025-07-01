using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.Controllers;
using CrumbCodeBackend.DTO;
using CrumbCodeBackend.Interfaces;
using CrumbCodeBackend.Mappers;
using CrumbCodeBackend.Models;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;
using static CrumbCodeBackend.Models.Requests.CakeRequestObject;


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

        [HttpGet("get-one")]
        public async Task<IActionResult> GetOne([FromQuery] string uuid)
        {
            var model = await _cakeRepository.GetOneAsync(uuid);

            if (model == null)
            {
                return BadRequest("model not gotten");
            }

            return Ok(model);

        }
        
        [HttpPost("create")]
        public async Task<IActionResult> CreateAsync([FromBody] NewCakeRequest newCakeRequest)
        {
            var dto = newCakeRequest.FromNewCakeRequestToModel();
            var model = await _cakeRepository.CreateAsync(dto);

            if (model == null)
            {
                return BadRequest("model not created");
            }

            var result = new CakeDto
            {
                Id = model.Id,
                Name = model.Name,
                Price = model.Price,
                CakeTypeId = model.CakeTypeId,
                Description = model.Description
            };

            return Ok(result);
            
        }

    }
}