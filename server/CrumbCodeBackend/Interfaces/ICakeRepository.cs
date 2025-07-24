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
    public interface ICakeRepository
    {
        public Task<ApiResponse<CakeDto>> UpdateAsync(string uuid, Cake cake);
        public Task<ApiResponse<CakeDto>> CreateAsync(Cake cake);
        public Task<ApiResponse<List<CakeDto>>> GetAllAsync(CakeQueryObject queryObject);
        public Task<ApiResponse<CakeDto>> GetOneAsync(string uuid);
        public Task<Cake?> Exists(string uuid);
        public Task<ApiResponse<CakeDto>> SafeDelete(string uuid);


    }
}