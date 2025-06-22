using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrumbCodeBackend.Models
{
    public class BaseModel
    {
        public int Id { get; set; }
        public string UUID { get; set; } = Guid.NewGuid().ToString();
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public DateTime UpdatedOn {get; set;} = DateTime.Now;
    }
}