using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrumbCodeBackend.Models.Requests
{
    public class ContactMessageRequest
    {
        public class NewContactMessageRequest()
        {
            public string UserId { get; set; } = null!;
            public string Name { get; set; } = null!;
            public string Email { get; set; } = null!;
            public string Message { get; set; } = null!;
            public ContactMessageTypes Type { get; set; } = ContactMessageTypes.INFO;
        }
    }
}