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
    public interface ISocialMediaRepository
    {
        public Task<ApiResponse<SocialMediaDto>> CreateAsync(SocialMedia cake);
        public Task<ApiResponse<List<SocialMediaDto>>> GetAllAsync(CakeQueryObject queryObject);
        public Task<SocialMediaDto?> GetOneAsync(string uuid);
        public Task<ApiResponse<SocialMediaDto>> Exists(string uuid);
        public Task<ApiResponse<SocialMediaDto>> UpdateAsync(string uuid, SocialMedia cake);
    }
}