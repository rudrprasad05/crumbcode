using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.Data;
using CrumbCodeBackend.DTO;
using CrumbCodeBackend.Interfaces;
using CrumbCodeBackend.Mappers;
using CrumbCodeBackend.Models;
using CrumbCodeBackend.Models.Requests;
using CrumbCodeBackend.Models.Response;
using Microsoft.EntityFrameworkCore;

namespace CrumbCodeBackend.Repository
{
    public class CakeRepository : ICakeRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IAmazonS3Service _amazonS3Service;

        public CakeRepository(ApplicationDbContext applicationDbContext, IAmazonS3Service amazonS3Service)
        {
            _context = applicationDbContext;
            _amazonS3Service = amazonS3Service;

        }

        public async Task<ApiResponse<CakeDto>> CreateAsync(Cake cake)
        {
            var model = await _context.Cakes.AddAsync(cake);
            await _context.SaveChangesAsync();
            var result = new CakeDto
            {
                Id = model.Entity.Id,
                Name = model.Entity.Name,
                Price = model.Entity.Price,
                CakeType = model.Entity.CakeType?.FromModelToDto(),
                Description = model.Entity.Description
            };

            return new ApiResponse<CakeDto>
            {
                Success = true,
                StatusCode = 200,
                Data = result,
            };
        }

        public async Task<ApiResponse<CakeDto>> UpdateAsync(string uuid, Cake updatedCake)
        {
            var existingCake = await _context.Cakes.FirstOrDefaultAsync(c => c.UUID == uuid);

            if (existingCake == null)
            {
                throw new KeyNotFoundException("Cake not found");
            }

            // Update fields manually
            existingCake.Name = updatedCake.Name;
            existingCake.Description = updatedCake.Description;
            existingCake.Price = updatedCake.Price;
            existingCake.MediaId = updatedCake.MediaId;
            // ... copy other fields as needed

            await _context.SaveChangesAsync();

            var result = new CakeDto
            {
                Id = existingCake.Id,
                Name = existingCake.Name,
                Price = existingCake.Price,
                CakeType = existingCake.CakeType?.FromModelToDto(),
                Description = existingCake.Description
            };

            return new ApiResponse<CakeDto>
            {
                Success = true,
                StatusCode = 200,
                Data = result,
            };
        }

        public Task<Cake?> Exists(string uuid)
        {
            var cake = _context.Cakes.FirstOrDefaultAsync(c => c.UUID == uuid);
            return cake;
        }

        public async Task<ApiResponse<List<CakeDto>>> GetAllAsync(CakeQueryObject queryObject)
        {
            var cakes = _context.Cakes.AsQueryable();
            var skip = (queryObject.PageNumber - 1) * queryObject.PageSize;

            var res = await cakes
                .Include(c => c.Media)
                .Include(c => c.CakeType)
                .Skip(skip)
                .Take(queryObject.PageSize)
                .ToListAsync();

            var result = new List<CakeDto>();

            foreach (var cake in res)
            {
                var media = cake.Media;

                MediaDto? mediaDto = null;
                if (media != null)
                {
                    var signedUrl = await _amazonS3Service.GetImageSignedUrl(media.ObjectKey);
                    mediaDto = new MediaDto
                    {
                        Url = signedUrl,
                        Id = media.Id,
                        UUID = media.UUID,
                        ObjectKey = media.ObjectKey,
                        AltText = media.AltText,
                        FileName = media.FileName,
                        ContentType = media.ContentType,
                        SizeInBytes = media.SizeInBytes
                    };
                }

                result.Add(new CakeDto
                {
                    Id = cake.Id,
                    Name = cake.Name,
                    Price = cake.Price,
                    IsAvailable = cake.IsAvailable,
                    Media = mediaDto,
                    UUID = cake.UUID,
                    Description = cake.Description,
                });
            }

            var totalCount = await _context.Cakes.CountAsync();

            return new ApiResponse<List<CakeDto>>
            {
                Success = true,
                StatusCode = 200,
                Data = result,
                Meta = new MetaData
                {
                    TotalCount = totalCount,
                    PageNumber = queryObject.PageNumber,
                    PageSize = queryObject.PageSize
                }
            };
        }

        public async Task<CakeDto?> GetOneAsync(string uuid)
        {
            var cake = await _context.Cakes
            .Include(c => c.Media)
            .FirstOrDefaultAsync(c => c.UUID == uuid);

            if (cake == null) {
                return null;
            }
            
            var media = cake.Media;

            MediaDto? mediaDto = null;
            if (media != null)
            {
                var signedUrl = await _amazonS3Service.GetImageSignedUrl(media.ObjectKey);
                mediaDto = new MediaDto
                {
                    Url = signedUrl,
                    Id = media.Id,
                    UUID = media.UUID,
                    ObjectKey = media.ObjectKey,
                    AltText = media.AltText,
                    FileName = media.FileName,
                    ContentType = media.ContentType,
                    SizeInBytes = media.SizeInBytes
                };
            }

            var dto = new CakeDto
            {
                Id = cake.Id,
                Name = cake.Name,
                Price = cake.Price,
                IsAvailable = cake.IsAvailable,
                Media = mediaDto,
                UUID = cake.UUID,
                CreatedOn = cake.CreatedOn,
                Description = cake.Description
            };
        
            return dto;
        }
    }
}