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
        public Task<Media?> CreateAsync(NewMediaRequest newMediaObject);
        public Task<List<Media>?> GetAll(MediaQueryObject queryObject);
        public Task<Media?> Star(string uuid, bool star, string? token);
        public Task<Media?> Edit(string uuid, EditMediaRequest request);
        public Task<Media?> MoveMedia(string uuid, string moveId, string? token);
        public Task<Media?> GetOne(string uuid);
        public Task<Media?> Recycle(string uuid, string? token);   
        public Task<Media?> Delete(string uuid);   
        public Task<double> SumStorage();
    }
}