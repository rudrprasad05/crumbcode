using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.DTO;
using CrumbCodeBackend.Interfaces;
using CrumbCodeBackend.Mappers;
using CrumbCodeBackend.Models.Requests;
using CrumbCodeBackend.Models.Response;
using Microsoft.AspNetCore.Mvc;
using static CrumbCodeBackend.Models.Requests.CakeRequestObject;
using static CrumbCodeBackend.Models.Response.SocialMediaResponse;

namespace CrumbCodeBackend.Controllers
{
    [Route("api/social-media")]
    [ApiController]

    public class SocialMediaController : BaseController
    {
        private readonly ISocialMediaRepository _socialMediaRepository;

        public SocialMediaController(
            ISocialMediaRepository socialMediaRepository,
            IConfiguration configuration,
            ITokenService tokenService
        ) : base(configuration, tokenService)
        {
            _socialMediaRepository = socialMediaRepository;
        }

        [HttpPost("upsert")]
        [ProducesResponseType(typeof(CreateSocialMediaResponse), 200)]
        public async Task<IActionResult> UpsertAsync([FromQuery] string uuid, [FromBody] SocialMediaRequestObject req)
        {
            var dto = req.FromNewCakeRequestToModel();
            var exists = await _socialMediaRepository.Exists(uuid);
            var model = new ApiResponse<SocialMediaDto>();

            if (exists.Success) // update
            {
                model = await _socialMediaRepository.UpdateAsync(uuid, dto);
            }
            else // create new
            {
                model = await _socialMediaRepository.CreateAsync(dto);
            }

            return Ok(model);
        }

        [HttpGet("get-all")]
        [ProducesResponseType(typeof(GetAllSocialMediaReponse), 200)]
        public async Task<IActionResult> GetAll([FromQuery] CakeQueryObject queryObject)
        {
            var model = await _socialMediaRepository.GetAllAsync(queryObject);

            if (model == null)
            {
                return BadRequest(new ApiResponse<List<SocialMediaDto>>
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