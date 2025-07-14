using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using CrumbCodeBackend.Models;

namespace CrumbCodeBackend.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext() { }
        public ApplicationDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole{Name = "Admin", NormalizedName = "ADMIN"},
                new IdentityRole{Name = "User", NormalizedName = "USER"}
            };
            modelBuilder.Entity<IdentityUserLogin<string>>().HasKey(login => new { login.LoginProvider, login.ProviderKey });
            modelBuilder.Entity<IdentityUserRole<string>>().HasKey(role => new { role.UserId, role.RoleId });
            modelBuilder.Entity<IdentityUserToken<string>>().HasKey(token => new { token.UserId, token.LoginProvider, token.Name });

            modelBuilder.UseCollation("utf8mb4_general_ci");
            modelBuilder.Entity<IdentityRole>().HasData(roles);

            modelBuilder.Entity<Notification>()
            .HasOne(n => n.User)
            .WithMany(u => u.Notifications)
            .HasForeignKey(n => n.UserId)
            .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Notification>()
            .Property(n => n.Type)
            .HasConversion<string>();

        }
        public DbSet<Cake> Cakes { get; set; }
        public DbSet<CakeType> CakeTypes { get; set; }
        public DbSet<Allergen> Allergens { get; set; }
        public DbSet<Media> Medias { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<SocialMedia> SocialMedias { get; set; }

    }
}