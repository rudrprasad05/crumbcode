using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.Models;
using static CrumbCodeBackend.Models.Requests.CakeTypeRequestObject;

namespace CrumbCodeBackend.Mappers
{
    public static class CakeTypeMapper
    {
        public static CakeType FromNewCakeTypeRequestToModel(this NewCakeTypeRequest request)
        {
            ArgumentNullException.ThrowIfNull(request);
            return new CakeType
            {
                Name = request.Name,
                Description = request.Description,
                Color = request.Color
            };
        }
    }
}