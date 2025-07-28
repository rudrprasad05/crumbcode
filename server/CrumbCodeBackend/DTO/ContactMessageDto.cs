using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.Migrations;
using CrumbCodeBackend.Models;

namespace CrumbCodeBackend.DTO
{
    public class ContactMessageDto
    {
        public int Id { get; set; }
        public string UUID { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public DateTime UpdatedOn {get; set;} = DateTime.Now;
        public bool IsDeleted { get; set; }
        public UserDto User { get; set; } = null!;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public ContactMessageTypes Type { get; set; } = ContactMessageTypes.INFO;
        public bool IsRead { get; set; } = false;
    }
}