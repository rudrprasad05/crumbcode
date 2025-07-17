using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CrumbCodeBackend.Migrations
{
    /// <inheritdoc />
    public partial class ContactMessage3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c2340c12-71af-423a-a5ea-cf8433ad066e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e2ff5de0-fa3c-47d0-9455-f7d06f2b49ec");

            migrationBuilder.AlterColumn<string>(
                name: "Type",
                table: "ContactMessages",
                type: "longtext",
                nullable: false,
                collation: "utf8mb4_general_ci",
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7724609c-4bbd-495d-aca2-cc0b12b24219", null, "User", "USER" },
                    { "a564800b-2a82-4aa6-a6bf-e88f9cf39871", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7724609c-4bbd-495d-aca2-cc0b12b24219");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a564800b-2a82-4aa6-a6bf-e88f9cf39871");

            migrationBuilder.AlterColumn<int>(
                name: "Type",
                table: "ContactMessages",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "c2340c12-71af-423a-a5ea-cf8433ad066e", null, "User", "USER" },
                    { "e2ff5de0-fa3c-47d0-9455-f7d06f2b49ec", null, "Admin", "ADMIN" }
                });
        }
    }
}
