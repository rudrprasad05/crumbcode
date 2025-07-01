using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.Models;
using static CrumbCodeBackend.Models.Requests.CakeRequestObject;

namespace CrumbCodeBackend.Mappers
{
    public static class CakeMapper
    {
        public static Cake FromNewCakeRequestToModel(this NewCakeRequest request)
        {
            ArgumentNullException.ThrowIfNull(request);
            return new Cake
            {
                Name = request.Name,
                Description = request.Description,
                Type = "0",
                IsAvailable = request.IsAvailable,
                Price = request.Price,
                MediaId = request.MediaId,
                CakeTypeId = request.CakeTypeId,
            };
        }
    }
}