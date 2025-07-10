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
    public class SocialMediaRepository : ISocialMediaRepository
    {
        private readonly ApplicationDbContext _context;

        public SocialMediaRepository(ApplicationDbContext applicationDbContext)
        {
            _context = applicationDbContext;

        }
        public async Task<ApiResponse<SocialMediaDto>> CreateAsync(SocialMedia socialMedia)
        {
            var model = await _context.SocialMedias.AddAsync(socialMedia);
            await _context.SaveChangesAsync();
            var result = new SocialMediaDto
            {
                Name = model.Entity.Name,
                Icon = model.Entity.Icon,
                Url = model.Entity.Url,
                IsActive = model.Entity.IsActive,
            };

            return new ApiResponse<SocialMediaDto>
            {
                Success = true,
                StatusCode = 200,
                Data = result,
            };
        }

        public async Task<ApiResponse<SocialMediaDto>> Exists(string uuid)
        {
            var model =  await _context.SocialMedias.FirstOrDefaultAsync(c => c.UUID == uuid);
            if (model == null) {
                return new ApiResponse<SocialMediaDto>
                {
                    Success = false,
                    StatusCode = 404
                };
            }

            var dto = model.FromModelToDto();
            return new ApiResponse<SocialMediaDto>
            {
                Success = true,
                StatusCode = 200,
                Data = dto
            };
        }

        public async Task<ApiResponse<List<SocialMediaDto>>> GetAllAsync(CakeQueryObject queryObject)
        {
            var query = _context.SocialMedias.AsQueryable();
            var skip = (queryObject.PageNumber - 1) * queryObject.PageSize;

            var res = await query
                .Skip(skip)
                .Take(queryObject.PageSize)
                .ToListAsync();

            var dtos = new List<SocialMediaDto>();

            foreach (var item in res)
            {   
                var temp = new SocialMediaDto
                {
                    Name = item.Name,
                    Icon = item.Icon,
                    Url = item.Url,
                    IsActive = item.IsActive,
                };

                dtos.Add(temp);
            }

            var totalCount = await _context.SocialMedias.CountAsync();

            return new ApiResponse<List<SocialMediaDto>>
            {
                Success = true,
                StatusCode = 200,
                Data = dtos,
                Meta = new MetaData
                {
                    TotalCount = totalCount,
                    PageNumber = queryObject.PageNumber,
                    PageSize = queryObject.PageSize
                }
            };
        }

        public Task<SocialMediaDto?> GetOneAsync(string uuid)
        {
            throw new NotImplementedException();
        }

        public async Task<ApiResponse<SocialMediaDto>> UpdateAsync(string uuid, SocialMedia sm)
        {
            var existing = await _context.SocialMedias.FirstOrDefaultAsync(c => c.UUID == uuid);

            if (existing == null)
            {
                throw new KeyNotFoundException("Cake not found");
            }

            existing.Name = sm.Name;
            existing.Icon = sm.Icon;
            existing.Url = sm.Url;
            existing.IsActive = sm.IsActive;

            await _context.SaveChangesAsync();

            var result = new SocialMediaDto
            {
                Name = existing.Name,
                Icon = existing.Icon,
                Url = existing.Url,
                IsActive = existing.IsActive,
            };

            return new ApiResponse<SocialMediaDto>
            {
                Success = true,
                StatusCode = 200,
                Data = result,
            };
        }
    }
}