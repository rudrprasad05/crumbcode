using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CrumbCodeBackend.Migrations
{
    /// <inheritdoc />
    public partial class ContactMessage2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContactMessage_AspNetUsers_UserId",
                table: "ContactMessage");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ContactMessage",
                table: "ContactMessage");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1baec8a3-3ea0-4155-94dc-9f7d696f5acf");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "373f59fe-bbb9-4124-9438-70eaec2dd7f9");

            migrationBuilder.RenameTable(
                name: "ContactMessage",
                newName: "ContactMessages");

            migrationBuilder.RenameIndex(
                name: "IX_ContactMessage_UserId",
                table: "ContactMessages",
                newName: "IX_ContactMessages_UserId");

            migrationBuilder.AddColumn<bool>(
                name: "IsRead",
                table: "ContactMessages",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ContactMessages",
                table: "ContactMessages",
                column: "Id");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "c2340c12-71af-423a-a5ea-cf8433ad066e", null, "User", "USER" },
                    { "e2ff5de0-fa3c-47d0-9455-f7d06f2b49ec", null, "Admin", "ADMIN" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_ContactMessages_AspNetUsers_UserId",
                table: "ContactMessages",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContactMessages_AspNetUsers_UserId",
                table: "ContactMessages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ContactMessages",
                table: "ContactMessages");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c2340c12-71af-423a-a5ea-cf8433ad066e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e2ff5de0-fa3c-47d0-9455-f7d06f2b49ec");

            migrationBuilder.DropColumn(
                name: "IsRead",
                table: "ContactMessages");

            migrationBuilder.RenameTable(
                name: "ContactMessages",
                newName: "ContactMessage");

            migrationBuilder.RenameIndex(
                name: "IX_ContactMessages_UserId",
                table: "ContactMessage",
                newName: "IX_ContactMessage_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ContactMessage",
                table: "ContactMessage",
                column: "Id");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1baec8a3-3ea0-4155-94dc-9f7d696f5acf", null, "Admin", "ADMIN" },
                    { "373f59fe-bbb9-4124-9438-70eaec2dd7f9", null, "User", "USER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_ContactMessage_AspNetUsers_UserId",
                table: "ContactMessage",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
