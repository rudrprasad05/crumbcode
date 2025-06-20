using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using static CrumbCodeBackend.Enum.Enum;

namespace CrumbCodeBackend.Models
{
    [Flags]
    public enum Allergen
    {
        None = 0,
        Gluten = 1 << 0,
        Eggs = 1 << 1,
        Nuts = 1 << 2,
        Dairy = 1 << 3,
        Soy = 1 << 4,
        // Add more as needed
    }
    [Table("cake")]
    public class Cake
    {
        public int Id { get; set; }
        public string UUID { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public CakeAllergens Allergens { get; set; } = CakeAllergens.NONE;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public DateTime UpdatedOn {get; set;} = DateTime.Now;
    
    }
}