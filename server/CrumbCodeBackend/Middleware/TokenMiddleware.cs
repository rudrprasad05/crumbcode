using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading.Tasks;
using CrumbCodeBackend.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace CrumbCodeBackend.Middleware
{
    public class TokenMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly string _signingKey;

        public TokenMiddleware(RequestDelegate next, IConfiguration configuration)
        {
            _signingKey = configuration["JWT:SigningKey"] ?? string.Empty;
            _next = next;
        }

        public async Task Invoke(HttpContext context, IUserContextService userContext)
        {
            var path = context.Request.Path.Value;

            // Allow /site paths without auth
            if (path.StartsWith("/api/site", StringComparison.OrdinalIgnoreCase) || path.StartsWith("/api/auth", StringComparison.OrdinalIgnoreCase))
            {
                await _next(context);
                return;
            }

            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (string.IsNullOrEmpty(token) || !ValidateJwtToken(token))
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                await context.Response.WriteAsync("Forbidden");
                return;
            }

            await _next(context);
        }
        private bool ValidateJwtToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_signingKey);

            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuer = false, // Set to true and configure if needed
                    ValidateAudience = false, // Set to true and configure if needed
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                return true;
            }
            catch
            {
                return false;
            }
        }

    }
}
