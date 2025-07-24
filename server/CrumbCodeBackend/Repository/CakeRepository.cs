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
        private readonly INotificationService _notificationService;

        public CakeRepository(INotificationService notificationService, ApplicationDbContext applicationDbContext, IAmazonS3Service amazonS3Service)
        {
            _context = applicationDbContext;
            _amazonS3Service = amazonS3Service;
            _notificationService = notificationService;

        }

        public async Task<ApiResponse<CakeDto>> CreateAsync(Cake cake)
        {
            var model = await _context.Cakes.AddAsync(cake);
            await _context.SaveChangesAsync();

            var result = model.Entity.FromModelToDto();

            await _notificationService.CreateNotificationAsync(
                title: "New Cake",
                message: "The cake " + result.Name + " was created",
                type: NotificationType.INFO,
                actionUrl: "/admin/cake/" + result.UUID
            );

            return new ApiResponse<CakeDto>
            {
                Success = true,
                StatusCode = 200,
                Data = result,
            };
        }

        public async Task<ApiResponse<CakeDto>> UpdateAsync(string uuid, Cake updatedCake)
        {
            var existingCake = await _context.Cakes.FirstOrDefaultAsync(c => c.UUID == uuid) ?? throw new KeyNotFoundException("Cake not found");

            // Update fields manually
            existingCake.Name = updatedCake.Name;
            existingCake.Description = updatedCake.Description;
            existingCake.Price = updatedCake.Price;
            existingCake.MediaId = updatedCake.MediaId;
            existingCake.CakeTypeId = updatedCake.CakeTypeId;
            existingCake.UpdatedOn = DateTime.UtcNow;
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
                MediaDto? mediaDto = null;
                if (cake.Media != null)
                {
                    var signedUrl = await _amazonS3Service.GetImageSignedUrl(cake.Media.ObjectKey);
                    mediaDto = cake.Media?.FromModelToDTO(signedUrl);
                }
                var dto = cake.FromModelToDto();
                dto.Media = mediaDto;
                result.Add(dto);
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

        public async Task<ApiResponse<CakeDto>> GetOneAsync(string uuid)
        {
            var cake = await _context.Cakes
            .Include(c => c.Media)
            .Include(c => c.CakeType)
            .FirstOrDefaultAsync(c => c.UUID == uuid);

            if (cake == null) {
                return new ApiResponse<CakeDto>
                {
                    Success = false,
                    StatusCode = 400,
                };
            }
            
            MediaDto? mediaDto = null;
            if (cake.Media != null)
            {
                var signedUrl = await _amazonS3Service.GetImageSignedUrl(cake.Media?.ObjectKey ?? "");
                mediaDto = cake.Media?.FromModelToDTO(url: signedUrl);
            }

            var dto = cake.FromModelToDto();
            dto.Media = mediaDto;

            return new ApiResponse<CakeDto>
            {
                Success = true,
                StatusCode = 200,
                Data = dto,
            };
        }

        public async Task<ApiResponse<CakeDto>> SafeDelete(string uuid)
        {
            var model = await _context.Cakes.FirstOrDefaultAsync((c) => c.UUID == uuid) ?? throw new KeyNotFoundException("Cake not found");

            model.IsDeleted = true;
            await _context.SaveChangesAsync();

            var result = model.FromModelToDto();
            return new ApiResponse<CakeDto>
            {
                Success = true,
                StatusCode = 200,
                Data = result,
            };
        }
    }
}