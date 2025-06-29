using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.Models;
using static CrumbCodeBackend.Models.Requests.CakeTypeRequestObject;

namespace CrumbCodeBackend.Interfaces
{
    public interface ICakeTypeRepository
    {
        public Task<CakeType?> CreateAsync(NewCakeTypeRequest cakeType);
        public Task<List<CakeType>> GetAllAsync();
    }
}