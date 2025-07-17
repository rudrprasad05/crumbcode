using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.DTO;
using CrumbCodeBackend.Models;
using static CrumbCodeBackend.Models.Requests.ContactMessageRequest;

namespace CrumbCodeBackend.Mappers
{
    public static class ContactMessageMapper
    {
        public static ContactMessage FromNewRequestToModel(this NewContactMessageRequest request)
        {
            ArgumentNullException.ThrowIfNull(request);
            return new ContactMessage
            {
                Name = request.Name,
                UserId = request.UserId,
                Email = request.Email,
                Message = request.Message,
                Type = request.Type,
                CreatedOn = DateTime.UtcNow,
                UpdatedOn = DateTime.UtcNow,
            };
        }

        public static ContactMessageDto FromModelToDto(this ContactMessage data)
        {
            ArgumentNullException.ThrowIfNull(data);
            return new ContactMessageDto
            {
                Id = data.Id,
                UUID = data.UUID,
                CreatedOn = data.CreatedOn,
                UpdatedOn = data.UpdatedOn,
                User = data.User,
                Name = data.Name,
                Email = data.Email,
                Message = data.Message,
                Type = data.Type,
                IsRead = data.IsRead,

            };
        }
    }
}