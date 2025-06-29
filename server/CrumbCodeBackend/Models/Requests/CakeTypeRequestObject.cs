using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrumbCodeBackend.Models.Requests
{
    public class CakeTypeRequestObject
    {
        public class NewCakeTypeRequest(string name, string description, string color)
        {
            public string Name { get; set; } = name;
            public string Description { get; set; } = description;
            public string Color { get; set; } = color;
        }
    }
}