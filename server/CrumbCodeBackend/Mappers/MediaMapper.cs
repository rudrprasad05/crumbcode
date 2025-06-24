using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
                Id = request.Id
            };
        }
    }
}