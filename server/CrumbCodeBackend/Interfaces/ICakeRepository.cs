using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.Models;

namespace CrumbCodeBackend.Interfaces
{
    public interface ICakeRepository
    {
        public Task<Cake> CreateAsync(Cake count);
        public Task<List<Cake>> GetAllAsync();
    }
}