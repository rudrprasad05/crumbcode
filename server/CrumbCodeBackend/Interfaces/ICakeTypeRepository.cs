using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.Models;
using CrumbCodeBackend.Models.Requests;
using CrumbCodeBackend.Models.Response;
using static CrumbCodeBackend.Models.Requests.CakeTypeRequestObject;

namespace CrumbCodeBackend.Interfaces
{
    public interface ICakeTypeRepository
    {
        public Task<CakeType?> CreateAsync(NewCakeTypeRequest cakeType);
        public Task<ApiResponse<CakeType>> DeleteAsync(string uuid);
        public Task<ApiResponse<List<CakeType>>> GetAllAsync(CakeQueryObject queryObject);
        public Task<ApiResponse<CakeType>> GetOne(string uuid);
    }
}