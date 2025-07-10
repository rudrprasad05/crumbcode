using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.DTO;
using CrumbCodeBackend.Models;
using CrumbCodeBackend.Models.Requests;

namespace CrumbCodeBackend.Mappers
{
    public static class SocialMediaMapper
    {
        public static SocialMedia FromNewCakeRequestToModel(this SocialMediaRequestObject request)
        {
            ArgumentNullException.ThrowIfNull(request);
            return new SocialMedia
            {
                Name = request.Name,
                Icon = request.Icon,
                Url = request.Url,
                IsActive = request.IsActive
            };
        }

        public static SocialMediaDto FromModelToDto(this SocialMedia cake)
        {
            ArgumentNullException.ThrowIfNull(cake);
            return new SocialMediaDto
            {
                Name = cake.Name,
                Icon = cake.Icon,
                Url = cake.Url,
                IsActive = cake.IsActive,
            };
        }
    }
}