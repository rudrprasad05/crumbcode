using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrumbCodeBackend.Models
{
    public class SocialMedia : BaseModel
    {
        public string Name { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;      
        public string Url { get; set; } = string.Empty;        
        public bool IsActive { get; set; } = true;
    }
}