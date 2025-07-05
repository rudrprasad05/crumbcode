using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrumbCodeBackend.Models
{
    public class Notification : BaseModel
    {
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public bool IsRead { get; set; } = false;
        public string Type { get; set; } = "info"; 
        public string? UserId { get; set; }
        public AppUser? User { get; set; }
    }
}