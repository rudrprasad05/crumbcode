using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.Controllers;
using CrumbCodeBackend.DTO;
using CrumbCodeBackend.Interfaces;
using CrumbCodeBackend.Mappers;
using CrumbCodeBackend.Models;
using CrumbCodeBackend.Models.Requests;
using CrumbCodeBackend.Models.Response;
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

        public CakeController(
            ICakeRepository cakeRepository,
            IConfiguration configuration, 
            ITokenService tokenService
        )  : base(configuration, tokenService)
        {
            _cakeRepository = cakeRepository;
        }

        [HttpGet("get-all")]
        [ProducesResponseType(typeof(GetAllCakeReponse), 200)]
        public async Task<IActionResult> GetAll([FromQuery] CakeQueryObject queryObject)
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
        
        [HttpPost("upsert")]
        public async Task<IActionResult> UpsertAsync([FromQuery] string uuid, [FromBody] NewCakeRequest newCakeRequest)
        {
            var dto = newCakeRequest.FromNewCakeRequestToModel();
            var exists = await _cakeRepository.Exists(uuid);
            var result = new CakeDto();

            if (exists != null) // update
            {
                var model = await _cakeRepository.UpdateAsync(uuid, dto);
                result = new CakeDto
                {
                    Id = model.Id,
                    Name = model.Name,
                    Price = model.Price,
                    CakeTypeId = model.CakeTypeId,
                    Description = model.Description
                };
            }
            else // create new
            {
                var model = await _cakeRepository.CreateAsync(dto);
                result = new CakeDto
                {
                    Id = model.Id,
                    Name = model.Name,
                    Price = model.Price,
                    CakeTypeId = model.CakeTypeId,
                    Description = model.Description
                };
            }


            return Ok(result);
            
        }

    }
}