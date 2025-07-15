using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.DTO;
using CrumbCodeBackend.Models;
using CrumbCodeBackend.Models.Requests;

namespace CrumbCodeBackend.Mappers
{
    public static class NotificationMapper
    {
        public static NotificationDto FromModelToDto(this Notification data)
        {
            ArgumentNullException.ThrowIfNull(data);
            return new NotificationDto
            {
                UUID = data.UUID,
                Id = data.Id,
                Title = data.Title,
                Message = data.Message,
                IsRead = data.IsRead,
                Type = data.Type,
                ActionUrl = data.ActionUrl,
                CreatedOn = data.CreatedOn,
                UpdatedOn = data.UpdatedOn,
            };
        }
    }
}