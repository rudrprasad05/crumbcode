using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.Models;
using CrumbCodeBackend.Models.Requests;

namespace CrumbCodeBackend.Interfaces
{
    public interface IMediaRepository
    {
        public Task<Media?> CreateAsync(IFormFile file, string id);
        public Task<List<Media>?> GetAll(MediaQueryObject queryObject, string? token);
        public Task<Media?> Star(int id, bool star, string? token);
        public Task<Media?> Rename(int id, string name, string? token);
        public Task<Media?> MoveMedia(int id, string moveId, string? token);
        public Task<Media?> GetOne(int id, string? token);
        public Task<Media?> Recycle(int id, string? token);   
        public Task<Media?> Delete(int id, string? token);   
        public Task<double> SumStorage(string userId);
    }
}