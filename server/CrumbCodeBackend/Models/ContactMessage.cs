using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrumbCodeBackend.Models
{
    public class ContactMessage : BaseModel
    {
        public AppUser User { get; set; } = null!;
        public string UserId { get; set; } = null!;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public ContactMessageTypes Type { get; set; } = ContactMessageTypes.INFO;
        public bool IsRead { get; set; } = false;

    }

    public enum ContactMessageTypes {
        INFO, ORDER, UPDATE
    }
}