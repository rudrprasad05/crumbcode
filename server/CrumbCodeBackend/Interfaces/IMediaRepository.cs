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
    public interface IMediaRepository
    {
        public Task<ApiResponse<MediaDto>> UpdateAsync(string uuid, Media media, IFormFile? file);
        public Task<ApiResponse<MediaDto>> CreateAsync(Media media, IFormFile? file);
        public Task<ApiResponse<MediaDto>> GetOne(string uuid);
        public Task<ApiResponse<List<Media>>> GetAll(MediaQueryObject queryObject);
        public Task<Media?> Exists(string uuid);
        public Task<Media?> Recycle(string uuid, string? token);   
        public Task<Media?> Delete(string uuid);   
        public Task<ApiResponse<double>> SumStorage();
    }
}