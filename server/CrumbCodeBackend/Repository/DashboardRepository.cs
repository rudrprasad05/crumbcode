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
    public class DashboardRepository : IDashboardRepository
    {
        private readonly ApplicationDbContext _context;

        public DashboardRepository(ApplicationDbContext applicationDbContext)
        {
            _context = applicationDbContext;
        }
        public async Task<ApiResponse<DashboardDto>> GetDashboard()
        {
            var totalCakes = await _context.Cakes.CountAsync();
            var totalMessages = await _context.ContactMessages.CountAsync();
            var totalUsers = await _context.Users.CountAsync();
            var totalMedia = await _context.Medias.CountAsync();
            var notificationQuery = _context.Notifications.AsQueryable();

            var res = await notificationQuery
                .Where(i => i.IsDeleted == false && i.IsRead == false)
                .Take(4)
                .ToListAsync();

            var notifications = new List<NotificationDto>();
            foreach (var item in res)
            {
                notifications.Add(item.FromModelToDto());
            }

            var dto = new DashboardDto
            {
                TotalCakes = totalCakes,
                TotalMessages = totalMessages,
                TotalUsers = totalUsers,
                TotalMedia = totalMedia,
                Notifications = notifications
            };

            return new ApiResponse<DashboardDto>
            {
                Success = true,
                StatusCode = 200,
                Data = dto,
            };

        }
    }
}