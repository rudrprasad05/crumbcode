using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.Data;
using CrumbCodeBackend.Interfaces;
using CrumbCodeBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace CrumbCodeBackend.Repository
{
    public class CakeRepository : ICakeRepository
    {
        private readonly ApplicationDbContext _context;
        public CakeRepository(ApplicationDbContext applicationDbContext)
        {
            _context = applicationDbContext;
        }

        public Task<Cake> CreateAsync(Cake count)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Cake>> GetAllAsync()
        {
            var data = _context.Cakes.AsQueryable();

            var res = await data.ToListAsync();

            return res; 
        }
    }
}