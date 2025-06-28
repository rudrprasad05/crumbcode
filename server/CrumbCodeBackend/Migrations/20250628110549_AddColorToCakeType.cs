using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CrumbCodeBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddColorToCakeType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6ce13f49-58a9-4039-a207-69779f0d9c35");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "afd58fea-b7ab-4746-ad8c-a396fe00031c");

            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "CakeTypes",
                type: "longtext",
                nullable: false,
                collation: "utf8mb4_general_ci");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4b54c426-ab8e-49bf-8f35-afeb01dd0186", null, "User", "USER" },
                    { "53676301-a49e-4ea8-b9d7-c73c51384692", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4b54c426-ab8e-49bf-8f35-afeb01dd0186");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "53676301-a49e-4ea8-b9d7-c73c51384692");

            migrationBuilder.DropColumn(
                name: "Color",
                table: "CakeTypes");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6ce13f49-58a9-4039-a207-69779f0d9c35", null, "User", "USER" },
                    { "afd58fea-b7ab-4746-ad8c-a396fe00031c", null, "Admin", "ADMIN" }
                });
        }
    }
}
