using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CrumbCodeBackend.Interfaces;
using CrumbCodeBackend.Models;
using Microsoft.IdentityModel.Tokens;

namespace CrumbCodeBackend.Service
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;
        private readonly IConfiguration _config; 
        public TokenService(IConfiguration config)
        {
            _config = config;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:SigningKey"] ?? throw new InvalidOperationException("No jwt signing key")));
        }
        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),
                new(JwtRegisteredClaimNames.UniqueName, user.UserName ?? string.Empty),
                new(JwtRegisteredClaimNames.NameId, user.Id)
            };

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds,
                Issuer = _config["JWT:Issuer"],
                Audience = _config["JWT:Audience"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
        /// <summary>
        /// get userid from header
        /// </summary>
        /// <param name="httpContext"></param>
        /// <returns></returns>
        public string? GetUserIdFromToken(HttpContext httpContext)
        {
            var authHeader = httpContext.Request.Headers.Authorization.FirstOrDefault();
            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            {
                return null; // Token missing or invalid
            }

            var token = authHeader.Substring(7); // Remove "Bearer " prefix
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);

            // Extract email from token claims
            var email = jwtToken.Claims.FirstOrDefault(c => c.Type == "nameid")?.Value;
            if (string.IsNullOrEmpty(email))
            {
                return null; // Invalid token
            }

            return email; // Return user ID
        }
    }
}