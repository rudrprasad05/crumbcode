using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CrumbCodeBackend.Migrations
{
    /// <inheritdoc />
    public partial class changeisrequired : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cake_CakeTypes_CakeTypeId",
                table: "Cake");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4652faaf-2e05-4cbb-9b8a-b45525761809");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "90c8df8a-41ad-4ef1-b97a-f9158bf161b5");

            migrationBuilder.AlterColumn<int>(
                name: "CakeTypeId",
                table: "Cake",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0a61b33d-baab-4763-885b-8a936b033f9e", null, "Admin", "ADMIN" },
                    { "c63019cf-069a-4954-bcc5-6a7676f91938", null, "User", "USER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Cake_CakeTypes_CakeTypeId",
                table: "Cake",
                column: "CakeTypeId",
                principalTable: "CakeTypes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cake_CakeTypes_CakeTypeId",
                table: "Cake");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0a61b33d-baab-4763-885b-8a936b033f9e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c63019cf-069a-4954-bcc5-6a7676f91938");

            migrationBuilder.AlterColumn<int>(
                name: "CakeTypeId",
                table: "Cake",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4652faaf-2e05-4cbb-9b8a-b45525761809", null, "User", "USER" },
                    { "90c8df8a-41ad-4ef1-b97a-f9158bf161b5", null, "Admin", "ADMIN" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Cake_CakeTypes_CakeTypeId",
                table: "Cake",
                column: "CakeTypeId",
                principalTable: "CakeTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
