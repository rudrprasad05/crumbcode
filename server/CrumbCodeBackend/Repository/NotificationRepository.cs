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
    public class NotificationRepository : INotificationRepository
    {
        private readonly ApplicationDbContext _context;

        public NotificationRepository(ApplicationDbContext applicationDbContext)
        {
            _context = applicationDbContext;

        }
        public async Task<ApiResponse<NotificationDto>> CreateAsync(Notification data)
        {
            var model = await _context.Notifications.AddAsync(data);
            await _context.SaveChangesAsync();

            var result = model.Entity.FromModelToDto();

            return new ApiResponse<NotificationDto>
            {
                Success = true,
                StatusCode = 200,
                Data = result,
            };
        }

        public async Task<ApiResponse<NotificationDto>> Exists(string uuid)
        {
            var model = await _context.Notifications.FirstOrDefaultAsync(c => c.UUID == uuid);
            if (model == null)
            {
                return new ApiResponse<NotificationDto>
                {
                    Success = false,
                    StatusCode = 404
                };
            }

            var dto = model.FromModelToDto();
            return new ApiResponse<NotificationDto>
            {
                Success = true,
                StatusCode = 200,
                Data = dto
            };
        }

        public async Task<ApiResponse<List<NotificationDto>>> GetAllAsync(CakeQueryObject queryObject)
        {
            var query = _context.Notifications.AsQueryable();
            var skip = (queryObject.PageNumber - 1) * queryObject.PageSize;

            var res = await query
                .Where(i => i.IsDeleted == false)
                .OrderByDescending(i => i.CreatedOn)
                .Skip(skip)
                .Take(queryObject.PageSize)
                .ToListAsync();

            var dtos = new List<NotificationDto>();

            foreach (var item in res)
            {
                dtos.Add(item.FromModelToDto());
            }

            var totalCount = await _context.Notifications.CountAsync();

            return new ApiResponse<List<NotificationDto>>
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

        public async Task<ApiResponse<NotificationDto>> GetOneAsync(string uuid)
        {
            var model = await _context.Notifications.FirstOrDefaultAsync(i => i.UUID == uuid);

            if (model == null)
            {
                return new ApiResponse<NotificationDto>
                {
                    Success = false,
                    StatusCode = 404,
                };
            }

            var dto = model.FromModelToDto();
            return new ApiResponse<NotificationDto>
            {
                Success = true,
                StatusCode = 200,
                Data = dto
            };
        }

        public async Task<ApiResponse<NotificationDto>> MarkRead(string uuid)
        {
            var model = await _context.Notifications.FirstOrDefaultAsync(i => i.UUID == uuid);
            if (model == null)
            {
                return new ApiResponse<NotificationDto>
                {
                    Success = false,
                    StatusCode = 404,
                };
            }

            model.IsRead = true;
            await _context.SaveChangesAsync();

            var result = model.FromModelToDto();
            return new ApiResponse<NotificationDto>
            {
                Success = true,
                StatusCode = 200,
                Data = result,
            };
            
        }

        public async Task<ApiResponse<NotificationDto>> SafeDelete(string uuid)
        {
            var model = await _context.Notifications.FirstOrDefaultAsync((c) => c.UUID == uuid) ?? throw new KeyNotFoundException("Cake not found");

            model.IsDeleted = true;
            await _context.SaveChangesAsync();

            var result = model.FromModelToDto();
            return new ApiResponse<NotificationDto>
            {
                Success = true,
                StatusCode = 200,
                Data = result,
            };
        }
    }
}