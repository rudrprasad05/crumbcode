using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.Data;
using CrumbCodeBackend.Interfaces;
using CrumbCodeBackend.Mappers;
using CrumbCodeBackend.Models;
using CrumbCodeBackend.Models.Requests;
using CrumbCodeBackend.Models.Response;
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

        public async Task<ApiResponse<CakeType>> DeleteAsync(string uuid)
        {
            var ct = await GetOne(uuid);
            var model = ct.Data;
            if (model == null)
            {
                return new ApiResponse<CakeType>
                {
                    Success = false,
                    StatusCode = 400
                };
            }

            _context.CakeTypes.Remove(model);
            await _context.SaveChangesAsync();

            return new ApiResponse<CakeType>
            {
                Success = true,
                StatusCode = 200,
                Data = model
            };
        }

        public async Task<ApiResponse<CakeType>> GetOne(string uuid)
        {
            var modelQ = _context.CakeTypes.AsQueryable();
            var model = await modelQ.FirstOrDefaultAsync(m => m.UUID == uuid);

            if (model == null)
            {
                return new ApiResponse<CakeType>
                {
                    Success = true,
                    StatusCode = 400
                };
            }

            return new ApiResponse<CakeType>
            {
                Success = true,
                StatusCode = 200,
                Data = model
            };
        }

        public async Task<ApiResponse<List<CakeType>>> GetAllAsync(CakeQueryObject queryObject)
        {

            var media = _context.CakeTypes.AsQueryable();
            var skip = (queryObject.PageNumber - 1) * queryObject.PageSize;

            var res = await media
                .Skip(skip)
                .Take(queryObject.PageSize)
                .ToListAsync();

            var totalCount = await _context.CakeTypes.CountAsync();

            return new ApiResponse<List<CakeType>>
            {
                Success = true,
                StatusCode = 200,
                Data = res,
                Meta = new MetaData
                {
                    TotalCount = totalCount,
                    PageNumber = queryObject.PageNumber,
                    PageSize = queryObject.PageSize
                }
            };
        }
    }
}