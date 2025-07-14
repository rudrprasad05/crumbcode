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
using static CrumbCodeBackend.Models.Response.CakeResonse;


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
        ) : base(configuration, tokenService)
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

        [HttpPost("upsert")]
        [ProducesResponseType(typeof(CreateNewCakeResponse), 200)]

        public async Task<IActionResult> UpsertAsync([FromQuery] string uuid, [FromBody] NewCakeRequest newCakeRequest)
        {
            var cake = newCakeRequest.FromNewCakeRequestToModel();
            var exists = await _cakeRepository.Exists(uuid);
            var model = new ApiResponse<CakeDto>();

            if (exists != null) // update
            {
                model = await _cakeRepository.UpdateAsync(uuid, cake);
            }
            else // create new
            {
                model = await _cakeRepository.CreateAsync(cake);
            }


            return Ok(model);

        }

        [HttpDelete("safe-delete/{uuid}")]
        [ProducesResponseType(typeof(CreateNewCakeResponse), 200)]
        public override async Task<IActionResult> SafeDelete([FromRoute] string uuid)
        {
            var model = await _cakeRepository.SafeDelete(uuid);

            if (model == null)
            {
                return BadRequest("model not gotten");
            }

            return Ok(model);
        }

    }
}