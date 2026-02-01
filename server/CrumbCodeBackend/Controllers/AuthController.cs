using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using CrumbCodeBackend.Interfaces;
using CrumbCodeBackend.Models;
using CrumbCodeBackend.Models.Response;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using static CrumbCodeBackend.Models.Requests.AuthRequestObject;


namespace CrumbCodeBackend.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/auth")]
    public class AuthController : BaseController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IWebHostEnvironment _env;
        private readonly RoleManager<IdentityRole> _roleManager;
        public AuthController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
            ITokenService tokenService,
            IWebHostEnvironment env
        ) : base(configuration, tokenService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _env = env;
        }

        [HttpPost("confirm-email/{id}")]
        [ProducesResponseType(typeof(string), 200)]
        public async Task<IActionResult> ConfirmEmail([FromRoute] string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return Unauthorized("Invalud username");
            }

            if (user.EmailConfirmed)
            {
                return Ok("Email already confirmed");
            }

            user.EmailConfirmed = true;
            await _userManager.UpdateAsync(user);
            return Ok("Email confirmed");
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Determine role type from email domain
            var roleType = model.Email.Contains("@procyonfiji.com") ? "Admin" : "User";

            try
            {
                var user = new AppUser
                {
                    UserName = model.Username,
                    Email = model.Email
                };

                // Create user
                var result = await _userManager.CreateAsync(user, model.Password);
                if (!result.Succeeded)
                    return BadRequest(result.Errors);

                // Ensure role exists
                if (!await _roleManager.RoleExistsAsync(roleType))
                {
                    await _roleManager.CreateAsync(new IdentityRole(roleType));
                }

                // Assign role
                var roleResult = await _userManager.AddToRoleAsync(user, roleType);
                if (!roleResult.Succeeded)
                    return BadRequest(roleResult.Errors);

                // Include role(s) in JWT
                var roles = await _userManager.GetRolesAsync(user);
                var token = _tokenService.CreateToken(user, roles);

                // Set cookie
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = !_env.IsDevelopment(),
                    SameSite = SameSiteMode.None,
                    Expires = DateTime.UtcNow.AddDays(7),
                    Domain = ".crumbcodefiji.com"
                };

                Console.WriteLine(cookieOptions);

                Response.Cookies.Append("token", token, cookieOptions);

                // Return login response
                return Ok(new LoginResponse
                {
                    Username = user.UserName ?? "",
                    Email = user.Email ?? "",
                    Token = token,
                    Role = roles.FirstOrDefault() ?? "User",
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null)
                {
                    return Unauthorized("Invalud Email");
                }

                var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
                if (!result.Succeeded)
                {
                    return Unauthorized("Username or password is incorrect");
                }
                var roles = await _userManager.GetRolesAsync(user);
                var tokenString = _tokenService.CreateToken(user, roles);

                Response.Cookies.Append("token", tokenString, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,  // Set to false for local development
                    SameSite = SameSiteMode.None,
                    Expires = DateTime.UtcNow.AddHours(1)
                });

                var userRole = roles.FirstOrDefault() ?? "user";

                return Ok(
                    new LoginResponse
                    {
                        Username = user.UserName ?? string.Empty,
                        Email = user.Email ?? string.Empty,
                        Id = user.Id,
                        Token = tokenString,
                        Role = userRole
                    }
                );

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            try
            {
                var authHeader = Request.Headers["Authorization"].FirstOrDefault();
                if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
                {
                    return Unauthorized(new { message = "Token missing or invalid" });
                }

                var token = authHeader.Substring(7);
                var handler = new JwtSecurityTokenHandler();
                var jwtToken = handler.ReadJwtToken(token);

                var email = jwtToken.Claims.FirstOrDefault(c => c.Type == "email")?.Value;
                if (string.IsNullOrEmpty(email))
                {
                    return Unauthorized(new { message = "Invalid token" });
                }

                var user = await _userManager.FindByEmailAsync(email);
                if (user == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                var roles = await _userManager.GetRolesAsync(user);
                var userRole = roles.FirstOrDefault() ?? "user";

                return Ok(
                    new LoginResponse
                    {
                        Username = user.UserName ?? string.Empty,
                        Email = user.Email ?? string.Empty,
                        Id = user.Id,
                        Token = token,
                        Role = userRole
                    }
                );
            }
            catch
            {
                return Unauthorized(new { message = "Invalid or expired token" });
            }
        }



    }
}

