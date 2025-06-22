using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using static CrumbCodeBackend.Enum.Enum;

namespace CrumbCodeBackend.Models
{
    [Table("cake")]
    public class Cake : BaseModel
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public bool IsAvailable { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; } = string.Empty;

        // fk
        public int CakeTypeId { get; set; }
        public CakeType CakeType { get; set; } = new CakeType();
        public ICollection<Allergen> Allergens { get; set; } = [];
    }
}