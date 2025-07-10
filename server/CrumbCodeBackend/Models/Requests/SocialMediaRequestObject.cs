using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrumbCodeBackend.Models.Requests
{
    public class SocialMediaRequestObject
    {
        public string Name { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;      
        public string Url { get; set; } = string.Empty;        
        public bool IsActive { get; set; } = true;
    }
}