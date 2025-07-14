using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.DTO;
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
                CreatedOn = DateTime.UtcNow,
                UpdatedOn = DateTime.UtcNow,
            };
        }

        public static CakeDto FromModelToDto(this Cake cake)
        {
            ArgumentNullException.ThrowIfNull(cake);
            return new CakeDto
            {
                Name = cake.Name,
                Description = cake.Description,
                IsAvailable = cake.IsAvailable,
                Price = cake.Price,
                Media = cake.Media?.FromModelToDTO(),
                CakeType = cake.CakeType?.FromModelToDto(),
                CreatedOn = cake.CreatedOn,
                UpdatedOn = cake.UpdatedOn,
                IsDeleted = cake.IsDeleted
            };
        }
    }
}