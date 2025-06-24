using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CrumbCodeBackend.Migrations
{
    /// <inheritdoc />
    public partial class uniqueuuid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "36b00bf8-17a7-4d75-959b-90f96af7341a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "61cd6026-1b6a-4608-8f95-f45c39e08b54");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "b9d53e9f-a932-46c8-9ee2-597841c7d1b7", null, "User", "USER" },
                    { "c55bff2d-ea3f-413e-9401-4ffe213725be", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b9d53e9f-a932-46c8-9ee2-597841c7d1b7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c55bff2d-ea3f-413e-9401-4ffe213725be");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "36b00bf8-17a7-4d75-959b-90f96af7341a", null, "Admin", "ADMIN" },
                    { "61cd6026-1b6a-4608-8f95-f45c39e08b54", null, "User", "USER" }
                });
        }
    }
}
