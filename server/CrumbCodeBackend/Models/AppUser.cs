using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace CrumbCodeBackend.Models
{
    public class AppUser : IdentityUser
    {
        public ICollection<Notification> Notifications { get; set; } = [];
        public ICollection<ContactMessage> ContactMessages{ get; set; } = [];

    }
}