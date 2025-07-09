using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrumbCodeBackend.Models.Response
{
    public class GetAllCakeTypeResponse
    {
        public GetAllCakeTypeResponse(List<CakeType> _cakeTypes, int _totalLength)
        {
            CakeTypes = _cakeTypes;
            TotalLength = _totalLength;
        }

        public List<CakeType> CakeTypes { get; set; } = [];
        public int TotalLength { get; set; } = 0;
    }
}