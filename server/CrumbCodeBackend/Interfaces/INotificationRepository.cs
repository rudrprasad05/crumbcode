using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.DTO;
using CrumbCodeBackend.Models;
using CrumbCodeBackend.Models.Requests;
using CrumbCodeBackend.Models.Response;

namespace CrumbCodeBackend.Interfaces
{
    public interface INotificationRepository
    {
        public Task<ApiResponse<NotificationDto>> CreateAsync(Notification data);
        public Task<ApiResponse<List<NotificationDto>>> GetAllAsync(CakeQueryObject queryObject);
        public Task<ApiResponse<NotificationDto>> GetOneAsync(string uuid);
        public Task<ApiResponse<NotificationDto>> MarkRead(string uuid);
        public Task<ApiResponse<NotificationDto>> SafeDelete(string uuid);
        public Task<ApiResponse<NotificationDto>> Exists(string uuid);
    }
}