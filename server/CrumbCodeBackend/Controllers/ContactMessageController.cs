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
using static CrumbCodeBackend.Models.Requests.ContactMessageRequest;
using static CrumbCodeBackend.Models.Response.CakeResonse;


namespace CrumbCodeBackend.Controllers
{
    [Route("api/contact")]
    [ApiController]
    public class ContactMessageController : ProtectedController
    {
        private readonly IContactMessageRepository _contactMessage;

        public ContactMessageController(
            IContactMessageRepository contactMessage,
            IConfiguration configuration,
            ITokenService tokenService
        ) : base(configuration, tokenService)
        {
            _contactMessage = contactMessage;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll([FromQuery] CakeQueryObject queryObject)
        {
            var model = await _contactMessage.GetAllAsync(queryObject);

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
            var model = await _contactMessage.GetOneAsync(uuid);

            if (model == null)
            {
                return BadRequest("model not gotten");
            }

            return Ok(model);

        }

        [HttpPost("upsert")]
        [ProducesResponseType(typeof(CreateNewCakeResponse), 200)]

        public async Task<IActionResult> UpsertAsync([FromBody] NewContactMessageRequest request)
        {
            var cake = request.FromNewRequestToModel();
            var model = await _contactMessage.CreateAsync(cake);

            return Ok(model);

        }

        [HttpDelete("safe-delete/{uuid}")]
        [ProducesResponseType(typeof(CreateNewCakeResponse), 200)]
        public override async Task<IActionResult> SafeDelete([FromRoute] string uuid)
        {
            var model = await _contactMessage.SafeDelete(uuid);

            if (model == null)
            {
                return BadRequest("model not gotten");
            }

            return Ok(model);
        }

    }
}