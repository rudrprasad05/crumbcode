using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrumbCodeBackend.Models.Response
{
    public class GetAllMediaResponse
    {
        public GetAllMediaResponse(List<Media> _medias, int _totalLength)
        {
            Medias = _medias;
            TotalLength = _totalLength;
        }

        public List<Media> Medias { get; set; } = [];
        public int TotalLength { get; set; } = 0;
    }
}