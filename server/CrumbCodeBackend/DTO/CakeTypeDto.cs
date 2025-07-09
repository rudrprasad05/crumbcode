using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrumbCodeBackend.DTO
{
    public class CakeTypeDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public string UUID { get; set; } = string.Empty;
        public int Id { get; set; }
    }
}