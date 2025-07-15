using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CrumbCodeBackend.Migrations
{
    /// <inheritdoc />
    public partial class notifications_enum : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7c90fefa-5b3d-4202-bc23-2a42873cde39");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c118412e-1073-4687-9f69-3f93b4f97dc0");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8b24f4ae-89db-4bfe-bd2b-9cb218f1f7ff", null, "User", "USER" },
                    { "972f2b1e-bedc-4176-a4d7-10a0c72332ea", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8b24f4ae-89db-4bfe-bd2b-9cb218f1f7ff");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "972f2b1e-bedc-4176-a4d7-10a0c72332ea");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7c90fefa-5b3d-4202-bc23-2a42873cde39", null, "User", "USER" },
                    { "c118412e-1073-4687-9f69-3f93b4f97dc0", null, "Admin", "ADMIN" }
                });
        }
    }
}
