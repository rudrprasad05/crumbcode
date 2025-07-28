using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CrumbCodeBackend.Migrations
{
    /// <inheritdoc />
    public partial class show_in_gallery : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7724609c-4bbd-495d-aca2-cc0b12b24219");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a564800b-2a82-4aa6-a6bf-e88f9cf39871");

            migrationBuilder.AddColumn<bool>(
                name: "ShowInGallery",
                table: "Medias",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "60e4a2ff-045b-4ce7-b30e-c8968316d5cf", null, "User", "USER" },
                    { "d9900fc5-1aaf-447b-8e4e-4ccaeeca2cb4", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "60e4a2ff-045b-4ce7-b30e-c8968316d5cf");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d9900fc5-1aaf-447b-8e4e-4ccaeeca2cb4");

            migrationBuilder.DropColumn(
                name: "ShowInGallery",
                table: "Medias");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7724609c-4bbd-495d-aca2-cc0b12b24219", null, "User", "USER" },
                    { "a564800b-2a82-4aa6-a6bf-e88f9cf39871", null, "Admin", "ADMIN" }
                });
        }
    }
}
