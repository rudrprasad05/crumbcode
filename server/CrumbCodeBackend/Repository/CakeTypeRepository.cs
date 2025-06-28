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
    public class CakeTypeRepository : ICakeTypeRepository
    {
        private readonly ApplicationDbContext _context;
        public CakeTypeRepository(ApplicationDbContext applicationDbContext)
        {
            _context = applicationDbContext;
        }

        public Task<Cake> CreateAsync(Cake count)
        {
            throw new NotImplementedException();
        }

        public Task<List<Cake>> GetAllAsync()
        {
            throw new NotImplementedException();
        }
    }
}