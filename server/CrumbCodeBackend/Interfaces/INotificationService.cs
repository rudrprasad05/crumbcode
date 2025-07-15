using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.Models;

namespace CrumbCodeBackend.Interfaces
{
    public interface INotificationService
    {
        public Task CreateNotificationAsync(string title, string message, NotificationType type = NotificationType.INFO, string? actionUrl = null);
    }
}