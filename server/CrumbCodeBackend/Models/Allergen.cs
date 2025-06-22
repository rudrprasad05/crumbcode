
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace CrumbCodeBackend.Models
{
    public class Allergen : BaseModel
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        // fk
        public ICollection<Cake> Cakes { get; set; } = [];
    }
}