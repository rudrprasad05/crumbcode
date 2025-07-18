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
    public class ContactMessageRepository : IContactMessageRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IAmazonS3Service _amazonS3Service;
        private readonly INotificationService _notificationService;

        public ContactMessageRepository(INotificationService notificationService, ApplicationDbContext applicationDbContext, IAmazonS3Service amazonS3Service)
        {
            _context = applicationDbContext;
            _amazonS3Service = amazonS3Service;
            _notificationService = notificationService;

        }

        public async Task<ApiResponse<ContactMessageDto>> CreateAsync(ContactMessage cake)
        {
            var model = await _context.ContactMessages.AddAsync(cake);
            await _context.SaveChangesAsync();

            var result = model.Entity.FromModelToDto();

            await _notificationService.CreateNotificationAsync(
                title: "New Message",
                message: "A user sent a message",
                type: NotificationType.INFO,
                actionUrl: "/admin/messages/" + result.UUID
            );

            return new ApiResponse<ContactMessageDto>
            {
                Success = true,
                StatusCode = 200,
                Data = result,
            };
        }

        public Task<ContactMessage?> Exists(string uuid)
        {
            var cake = _context.ContactMessages.FirstOrDefaultAsync(c => c.UUID == uuid);
            return cake;
        }

        public async Task<ApiResponse<List<ContactMessageDto>>> GetAllAsync(CakeQueryObject queryObject)
        {
            var cakes = _context.ContactMessages.AsQueryable();
            var skip = (queryObject.PageNumber - 1) * queryObject.PageSize;

            var res = await cakes
                .Include(c => c.User)
                .Skip(skip)
                .Take(queryObject.PageSize)
                .ToListAsync();

            var result = new List<ContactMessageDto>();

            foreach (var cake in res)
            {
                result.Add(cake.FromModelToDto());
            }

            var totalCount = await _context.ContactMessages.CountAsync();

            return new ApiResponse<List<ContactMessageDto>>
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

        public async Task<ApiResponse<ContactMessageDto>> GetOneAsync(string uuid)
        {
            var model = await _context.ContactMessages
            .Include(c => c.User)
            .FirstOrDefaultAsync(c => c.UUID == uuid);

            if (model == null)
            {
                return new ApiResponse<ContactMessageDto>
                {
                    Success = false,
                    StatusCode = 404
                };
            }

            var result = model?.FromModelToDto();
            return new ApiResponse<ContactMessageDto>
            {
                Success = true,
                StatusCode = 200,
                Data = result,
            };
        }

        public async Task<ApiResponse<ContactMessageDto>> SafeDelete(string uuid)
        {
            var model = await _context.ContactMessages.FirstOrDefaultAsync((c) => c.UUID == uuid) ?? throw new KeyNotFoundException("Cake not found");

            model.IsDeleted = true;
            await _context.SaveChangesAsync();

            var result = model.FromModelToDto();
            return new ApiResponse<ContactMessageDto>
            {
                Success = true,
                StatusCode = 200,
                Data = result,
            };
        }

    }
}