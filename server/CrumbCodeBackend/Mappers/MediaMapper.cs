using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.DTO;
using CrumbCodeBackend.Models;
using CrumbCodeBackend.Models.Response;

namespace CrumbCodeBackend.Mappers
{
    public static class MediaMapper
    {
        public static GetOnlyMediaRes FromMediaToDTO(this Media request)
        {
            ArgumentNullException.ThrowIfNull(request);
            return new GetOnlyMediaRes
            {
                Id = request.Id,
                AltText = request.AltText,
                FileName = request.FileName,
                ContentType = request.ContentType,
                SizeInBytes = request.SizeInBytes,
                UUID = request.UUID,
                Url = request.Url,
                CreatedOn = request.CreatedOn,
                ShowInGallery = request.ShowInGallery
            };
        }

        public static MediaDto FromModelToDTO(this Media request, string? url = null)
        {
            ArgumentNullException.ThrowIfNull(request);
            return new MediaDto
            {
                Id = request.Id,
                AltText = request.AltText,
                FileName = request.FileName,
                ContentType = request.ContentType,
                SizeInBytes = request.SizeInBytes,
                UUID = request.UUID,
                Url = url ?? request.Url,
                ShowInGallery = request.ShowInGallery || true
            };

        }
    }
}