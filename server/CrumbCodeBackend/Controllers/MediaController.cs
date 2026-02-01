using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3;
using CrumbCodeBackend.DTO;
using CrumbCodeBackend.Interfaces;
using CrumbCodeBackend.Mappers;
using CrumbCodeBackend.Models;
using CrumbCodeBackend.Models.Requests;
using CrumbCodeBackend.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace CrumbCodeBackend.Controllers
{
    [ApiController]
    [Route("api/media")]
    public class MediaController : ProtectedController
    {
        private readonly IMediaRepository _mediaRepository;
        private readonly IAmazonS3Service _amazonS3Service;

        public MediaController(IMediaRepository mediaRepository,
            IAmazonS3Service amazonS3Service,
            IConfiguration configuration,
            ITokenService tokenService
        ) : base(configuration, tokenService)
        {
            _mediaRepository = mediaRepository;
            _amazonS3Service = amazonS3Service;
        }

        [HttpPost("upsert")]
        public async Task<IActionResult> UpsertAsync(
            [FromQuery] string? uuid,
            [FromForm] string AltText,
            [FromForm] string FileName,
            [FromForm] bool ShowInGallery,
            IFormFile? File)
        {

            var req = new Media
            {
                AltText = AltText,
                FileName = FileName,
                ShowInGallery = ShowInGallery,
            };

            if (File != null)
            {
                req.SizeInBytes = File.Length;
                req.ContentType = File.ContentType;
            }

            var exists = await _mediaRepository.Exists(uuid ?? "");
            var model = new ApiResponse<MediaDto>();

            if (exists != null && uuid != null) // update
            {
                model = await _mediaRepository.UpdateAsync(uuid, req, file: File);
            }
            else
            {
                model = await _mediaRepository.CreateAsync(req, file: File);
            }

            return Ok(model);
        }

        [HttpGet("sum")]
        public async Task<IActionResult> Sum()
        {
            var req = await _mediaRepository.SumStorage();

            return Ok(req);
        }

        [HttpGet("get-all")]
        [ProducesResponseType(typeof(GetAllMediaResponse), 200)]

        public async Task<IActionResult> GetAll([FromQuery] CakeQueryObject queryObject)
        {
            var media = await _mediaRepository.GetAll(queryObject);
            if (media == null)
            {
                return BadRequest(new ApiResponse<List<CakeType>>
                {
                    Success = false,
                    StatusCode = 400,
                }
                );
            }

            return Ok(media);
        }

        [HttpGet("get-one/{id}")]
        public async Task<IActionResult> GetOne([FromRoute] string id)
        {
            var media = await _mediaRepository.GetOne(id);
            if (media == null)
            {
                return Unauthorized();
            }

            return Ok(media);
        }

        [HttpDelete("safe-delete/{uuid}")]
        public override async Task<IActionResult> SafeDelete([FromRoute] string uuid)
        {
            var model = await _mediaRepository.SafeDelete(uuid);

            if (model == null)
            {
                return BadRequest("model not gotten");
            }

            return Ok(model);
        }

        [HttpGet("download")]
        public async Task<IActionResult> DownloadFile([FromQuery] string objKey)
        {
            try
            {
                var fileStream = await _amazonS3Service.GetObjectAsync(objKey);

                if (fileStream == null)
                {
                    return BadRequest("File not found or error retrieving file.");
                }

                using var responseStream = fileStream.ResponseStream;
                using var memoryStream = new MemoryStream();
                await responseStream.CopyToAsync(memoryStream);

                var contentType = fileStream.Headers["Content-Type"];
                return File(memoryStream.ToArray(), contentType, objKey);
            }
            catch (AmazonS3Exception ex)
            {
                return BadRequest($"S3 error: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Server error: {ex.Message}");
            }
        }
    }
}