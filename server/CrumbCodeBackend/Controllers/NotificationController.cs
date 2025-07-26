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
    [Route("api/notification")]
    [ApiController]

    public class NotificationController : ProtectedController
    {
        private readonly INotificationRepository _notificationRepository;

        public NotificationController(
            INotificationRepository notificationRepository,
            IConfiguration configuration,
            ITokenService tokenService
        ) : base(configuration, tokenService)
        {
            _notificationRepository = notificationRepository;
        }

        [HttpGet("get-all")]
        [ProducesResponseType(typeof(GetAllSocialMediaReponse), 200)]
        public async Task<IActionResult> GetAll([FromQuery] CakeQueryObject queryObject)
        {
            var model = await _notificationRepository.GetAllAsync(queryObject);

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

        [HttpGet("mark-read")]
        [ProducesResponseType(typeof(GetAllSocialMediaReponse), 200)]
        public async Task<IActionResult> MarkRead([FromQuery] string uuid)
        {
            var model = await _notificationRepository.MarkRead(uuid);
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

        [HttpGet("get-one")]
        public async Task<IActionResult> GetOne([FromQuery] string uuid)
        {
            var model = await _notificationRepository.GetOneAsync(uuid);
            return Ok(model);
        }
        
        [HttpDelete("safe-delete")]
        public override async Task<IActionResult> SafeDelete([FromQuery] string uuid)
        {
            var model = await _notificationRepository.SafeDelete(uuid);

            if (model == null)
            {
                return BadRequest("model not gotten");
            }

            return Ok(model);
        }

    }
}