using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.Migrations;

namespace CrumbCodeBackend.DTO
{
    public class CakeDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool IsAvailable { get; set; } = true;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string UUID { get; set; } = string.Empty;
        public MediaDto? Media { get; set; }
        public bool IsDeleted { get; set; }
        public CakeTypeDto? CakeType { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public DateTime UpdatedOn {get; set;} = DateTime.Now;
    }
}