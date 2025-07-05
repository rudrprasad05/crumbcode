using System.Threading.Tasks;
using CrumbCodeBackend.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace CrumbCodeBackend.Middleware
{
    public class TokenMiddleware
    {
        private readonly RequestDelegate _next;

        public TokenMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, IUserContextService userContext)
        {
            // Resolve ITokenService from request scope here
            var tokenService = context.RequestServices.GetRequiredService<ITokenService>();

            var userId = tokenService.GetUserIdFromToken(context);
            if (!string.IsNullOrEmpty(userId))
            {
                context.Items["UserId"] = userId;
                userContext.SetUserId(userId);
            }

            await _next(context);
        }
    }
}
