using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3;
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
    public class MediaController : BaseController
    {
        private readonly IMediaRepository _mediaRepository;
        private readonly IAmazonS3Service _amazonS3Service;

        public MediaController(IMediaRepository mediaRepository,
            IAmazonS3Service amazonS3Service,
            IConfiguration configuration, 
            ITokenService tokenService
        )  : base(configuration, tokenService)
        {
            _mediaRepository = mediaRepository;
            _amazonS3Service = amazonS3Service;
        }

        [HttpPost("create")]
        [ProducesResponseType(typeof(GetOnlyMediaRes), 200)]

        public async Task<IActionResult> CreateMedia(
            [FromForm] string Url,
            [FromForm] string AltText,
            [FromForm] string FileName,
            [FromForm] string ContentType,
            [FromForm] long SizeInBytes,
            IFormFile File
        )
        {
            if (!ModelState.IsValid)
            {
                // Return detailed model validation errors
                return BadRequest(ModelState);
            }
            if (File == null)
            {
                return BadRequest("File is required.");
            }
            try
            {
                var mo = new NewMediaRequest(
                    Url,
                    AltText,
                    FileName,
                    ContentType,
                    File
                );
                var media = await _mediaRepository.CreateAsync(mo);
                if (media == null)
                {
                    return BadRequest("Media not created.");
                }

                var dto = media.FromMediaToDTO(); // if you have a mapper
                return Ok(dto);
            }
            catch (Exception ex)
            {
                // log error (optional)
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("sum")]
        public async Task<IActionResult> Sum()
        {
            var req = await _mediaRepository.SumStorage();

            return Ok(req);
        }

        [HttpGet("get-all")]
        [ProducesResponseType(typeof(GetAllMediaResponse), 200)]
        
        public async Task<IActionResult> GetAll([FromQuery] MediaQueryObject queryObject)
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

        [HttpPatch("edit/{id}")]
        public async Task<IActionResult> Edit([FromRoute] string id, [FromBody] EditMediaRequest request)
        {
            var media = await _mediaRepository.Edit(id, request);
            if(media == null)
            {
                return BadRequest();
            }

            return Ok(media);
        }

        [HttpGet("get-one/{id}")]
        public async Task<IActionResult> GetOne([FromRoute] string id)
        {
            var media = await _mediaRepository.GetOne(id);
            if(media == null)
            {
                return Unauthorized();
            }

            var dto = media.FromMediaToDTO();
            return Ok(media);
        }

        [HttpDelete("recycle/{id}")]
        public async Task<IActionResult> Recycle([FromRoute] string id)
        {
            var media = await _mediaRepository.Recycle(id, "");
            if(media == null)
            {
                return Unauthorized();
            }

            var dto = media.FromMediaToDTO();
            return Ok(dto);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete([FromRoute] string id)
        {
            var media = await _mediaRepository.Delete(id);
            if(media == null)
            {
                return Unauthorized();
            }

            var deleteFromS3 = await _amazonS3Service.DeleteFileAsync(media.ObjectKey ?? throw new InvalidOperationException());
            
            if(deleteFromS3 == true)
            {
                return Ok("deleted");
            }

            return BadRequest("not deleted");
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