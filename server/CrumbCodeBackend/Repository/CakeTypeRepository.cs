using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.Data;
using CrumbCodeBackend.Interfaces;
using CrumbCodeBackend.Mappers;
using CrumbCodeBackend.Models;
using Microsoft.EntityFrameworkCore;
using static CrumbCodeBackend.Models.Requests.CakeTypeRequestObject;

namespace CrumbCodeBackend.Repository
{
    public class CakeTypeRepository : ICakeTypeRepository
    {
        private readonly ApplicationDbContext _context;
        public CakeTypeRepository(ApplicationDbContext applicationDbContext)
        {
            _context = applicationDbContext;
        }

        public async Task<CakeType?> CreateAsync(NewCakeTypeRequest cakeTypeRequest)
        {
            var model = cakeTypeRequest.FromNewCakeTypeRequestToModel();
            if (model == null)
            {
                return null;
            }

            await _context.CakeTypes.AddAsync(model);
            await _context.SaveChangesAsync();
            return model;
        }

        public async Task<List<CakeType>> GetAllAsync()
        {

            var data = _context.CakeTypes.AsQueryable();

            var res = await data.ToListAsync();

            return res; 
        }
    }
}