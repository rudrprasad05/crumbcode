using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.Interfaces;

namespace CrumbCodeBackend.Middleware
{
    public class TokenMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ITokenService _tokenService;

        public TokenMiddleware(RequestDelegate next, ITokenService tokenService)
        {
            _next = next;
            _tokenService = tokenService;
        }

        public async Task Invoke(HttpContext context, IUserContextService userContext)
        {
            var userId = _tokenService.GetUserIdFromToken(context);
            if (!string.IsNullOrEmpty(userId))
            {
                context.Items["UserId"] = userId;
                userContext.SetUserId(userId);
            }

            await _next(context);
        }
    }
}