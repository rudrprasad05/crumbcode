using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using static CrumbCodeBackend.Enum.Enum;

namespace CrumbCodeBackend.Models
{
    [Table("Cake")]
    public class Cake : BaseModel
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public bool IsAvailable { get; set; }
        public decimal Price { get; set; }


        // fk
        public int? MediaId { get; set; }   // FK to Media (nullable)
        public Media? Media { get; set; }
        public int? CakeTypeId { get; set; }
        public CakeType? CakeType { get; set; }
        public ICollection<Allergen> Allergens { get; set; } = [];
    }
}