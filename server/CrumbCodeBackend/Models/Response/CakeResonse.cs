using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrumbCodeBackend.Models.Response
{
    public class CakeResonse
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

        public class CreateNewCakeResponse
        {
            public CreateNewCakeResponse(){}

            public Cake Cake { get; set; } = null!;
            public int TotalLength { get; set; } = 0;
        }
        
    }
}