using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrumbCodeBackend.DTO
{
    public class DashboardDto
    {
        public int TotalCakes { get; set; }
        public int TotalMessages { get; set; }
        public int TotalUsers { get; set; }
        public int TotalMedia { get; set; }
        public List<NotificationDto> Notifications { get; set; } = [];


    }
}