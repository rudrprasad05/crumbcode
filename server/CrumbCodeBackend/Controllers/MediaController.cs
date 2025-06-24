using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3;
using CrumbCodeBackend.Interfaces;
using CrumbCodeBackend.Mappers;
using CrumbCodeBackend.Models.Requests;
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
            IAmazonS3Service amazonS3Service
        )
        {
            _mediaRepository = mediaRepository;
            _amazonS3Service = amazonS3Service;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateMedia([FromForm] NewMediaRequest newMediaObject)
        {
            var req = await _mediaRepository.CreateAsync(newMediaObject);
            if(req == null)
            {
                return BadRequest("Media not Created");
            }


            var resp = req.FromMediaToDTO();

            return Ok(resp);
        }

        [HttpGet("sum")]
        public async Task<IActionResult> Sum()
        {
            var req = await _mediaRepository.SumStorage();

            return Ok(req);
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll([FromQuery] MediaQueryObject queryObject)
        {
            var media = await _mediaRepository.GetAll(queryObject);
            if(media == null)
            {
                return BadRequest();
            }
            var dtos = media.ToList();
            return Ok(dtos);
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

            var deleteFromS3 = await _amazonS3Service.DeleteFileAsync("fileName" ?? throw new InvalidOperationException());
            
            if(deleteFromS3 == true)
            {
                return Ok("deleted");
            }

            return BadRequest("not deleted");
        }
        
        [HttpGet("download")]
        public async Task<IActionResult> DownloadFile([FromQuery] string fileName)
        {
            try
            {
                var fileStream = await _amazonS3Service.GetObjectAsync(fileName);

                if (fileStream == null)
                {
                    return BadRequest("File not found or error retrieving file.");
                }

                using var responseStream = fileStream.ResponseStream;
                using var memoryStream = new MemoryStream();
                await responseStream.CopyToAsync(memoryStream);
                
                var contentType = fileStream.Headers["Content-Type"];
                return File(memoryStream.ToArray(), contentType, fileName);
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