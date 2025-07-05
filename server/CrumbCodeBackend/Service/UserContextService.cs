using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.Interfaces;

namespace CrumbCodeBackend.Service
{
    public class UserContextService : IUserContextService
    {
        private string? _userId;
        public void SetUserId(string userId) => _userId = userId;
        public string? GetUserId() => _userId;
    }
}