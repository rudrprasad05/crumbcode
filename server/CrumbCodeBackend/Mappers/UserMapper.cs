using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.DTO;
using CrumbCodeBackend.Models;

namespace CrumbCodeBackend.Mappers
{
    public static class UserMapper
    {
        public static UserDto FromModelToDto(this AppUser data)
        {
            ArgumentNullException.ThrowIfNull(data);
            return new UserDto
            {
                Id = data.Id,
                UserName = data.UserName ?? "",
                Email = data.Email ?? "",
            };
        }
    }
}