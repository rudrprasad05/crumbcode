using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrumbCodeBackend.Models.Requests
{
    public class CakeRequestObject
    {
        public class NewCakeRequest()
        {
            public string Name { get; set; } = string.Empty;
            public string Description { get; set; } = string.Empty;
            public string Type { get; set; } = string.Empty;
            public bool IsAvailable { get; set; }
            public decimal Price { get; set; }
            public int? MediaId { get; set; } 
            public int CakeTypeId { get; set; }
        }
    }
}