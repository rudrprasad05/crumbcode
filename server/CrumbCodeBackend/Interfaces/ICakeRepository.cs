using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.DTO;
using CrumbCodeBackend.Models;

namespace CrumbCodeBackend.Interfaces
{
    public interface ICakeRepository
    {
        public Task<Cake> CreateAsync(Cake cake);
        public Task<List<CakeDto>> GetAllAsync();
        public Task<CakeDto?> GetOneAsync(string uuid);

    }
}