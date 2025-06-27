using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CrumbCodeBackend.Migrations
{
    /// <inheritdoc />
    public partial class MediaObjectKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b9d53e9f-a932-46c8-9ee2-597841c7d1b7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c55bff2d-ea3f-413e-9401-4ffe213725be");

            migrationBuilder.AddColumn<string>(
                name: "ObjectKey",
                table: "Medias",
                type: "longtext",
                nullable: false,
                collation: "utf8mb4_general_ci");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6ce13f49-58a9-4039-a207-69779f0d9c35", null, "User", "USER" },
                    { "afd58fea-b7ab-4746-ad8c-a396fe00031c", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6ce13f49-58a9-4039-a207-69779f0d9c35");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "afd58fea-b7ab-4746-ad8c-a396fe00031c");

            migrationBuilder.DropColumn(
                name: "ObjectKey",
                table: "Medias");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "b9d53e9f-a932-46c8-9ee2-597841c7d1b7", null, "User", "USER" },
                    { "c55bff2d-ea3f-413e-9401-4ffe213725be", null, "Admin", "ADMIN" }
                });
        }
    }
}
