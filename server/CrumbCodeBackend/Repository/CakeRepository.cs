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

        public Task<List<Cake>> GetAllCakeAsync()
        {
            throw new NotImplementedException();
        }
    }
}