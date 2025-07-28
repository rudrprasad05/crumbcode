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
    public interface IContactMessageRepository
    {
        public Task<ApiResponse<ContactMessageDto>> CreateAsync(ContactMessage cake);
        public Task<ApiResponse<List<ContactMessageDto>>> GetAllAsync(CakeQueryObject queryObject);
        public Task<ApiResponse<ContactMessageDto>> GetOneAsync(string uuid);
        public Task<ContactMessage?> Exists(string uuid);
        public Task<ApiResponse<ContactMessageDto>> SafeDelete(string uuid);

    }
}