using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrumbCodeBackend.Models.Response
{
    public class GetAllCakeReponse
    {
        public GetAllCakeReponse(List<Cake> _cakes, int _totalLength)
        {
            Cakes = _cakes;
            TotalLength = _totalLength;
        }

        public List<Cake> Cakes { get; set; } = [];
        public int TotalLength { get; set; } = 0;
    }
}