using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrumbCodeBackend.DTO
{
    public class SocialMediaDto
    {
        public string Name { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;      
        public string Url { get; set; } = string.Empty;    
        public string UUID { get; set; } = string.Empty;
        public int Id { get; set; } = 0;  
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public DateTime UpdatedOn { get; set; } = DateTime.Now;
        public bool IsDeleted { get; set; } = false;      
        public bool IsActive { get; set; } = true;
    }
}