using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CrumbCodeBackend.Migrations
{
    /// <inheritdoc />
    public partial class init2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AllergenCake_cake_CakesId",
                table: "AllergenCake");

            migrationBuilder.DropForeignKey(
                name: "FK_cake_CakeTypes_CakeTypeId",
                table: "cake");

            migrationBuilder.DropForeignKey(
                name: "FK_cake_Medias_MediaId",
                table: "cake");

            migrationBuilder.DropPrimaryKey(
                name: "PK_cake",
                table: "cake");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8c4c2fc8-4ef0-47ca-b541-47547cbc103d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fa0d51fc-fd46-4cd1-a7d8-b8d3db3621e8");

            migrationBuilder.RenameTable(
                name: "cake",
                newName: "Cake");

            migrationBuilder.RenameIndex(
                name: "IX_cake_MediaId",
                table: "Cake",
                newName: "IX_Cake_MediaId");

            migrationBuilder.RenameIndex(
                name: "IX_cake_CakeTypeId",
                table: "Cake",
                newName: "IX_Cake_CakeTypeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cake",
                table: "Cake",
                column: "Id");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "966a3fd5-511c-4976-90c5-55697681cdb8", null, "User", "USER" },
                    { "f44e5ab8-a701-4d05-bf87-d5d359939869", null, "Admin", "ADMIN" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_AllergenCake_Cake_CakesId",
                table: "AllergenCake",
                column: "CakesId",
                principalTable: "Cake",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cake_CakeTypes_CakeTypeId",
                table: "Cake",
                column: "CakeTypeId",
                principalTable: "CakeTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cake_Medias_MediaId",
                table: "Cake",
                column: "MediaId",
                principalTable: "Medias",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AllergenCake_Cake_CakesId",
                table: "AllergenCake");

            migrationBuilder.DropForeignKey(
                name: "FK_Cake_CakeTypes_CakeTypeId",
                table: "Cake");

            migrationBuilder.DropForeignKey(
                name: "FK_Cake_Medias_MediaId",
                table: "Cake");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cake",
                table: "Cake");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "966a3fd5-511c-4976-90c5-55697681cdb8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f44e5ab8-a701-4d05-bf87-d5d359939869");

            migrationBuilder.RenameTable(
                name: "Cake",
                newName: "cake");

            migrationBuilder.RenameIndex(
                name: "IX_Cake_MediaId",
                table: "cake",
                newName: "IX_cake_MediaId");

            migrationBuilder.RenameIndex(
                name: "IX_Cake_CakeTypeId",
                table: "cake",
                newName: "IX_cake_CakeTypeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_cake",
                table: "cake",
                column: "Id");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8c4c2fc8-4ef0-47ca-b541-47547cbc103d", null, "Admin", "ADMIN" },
                    { "fa0d51fc-fd46-4cd1-a7d8-b8d3db3621e8", null, "User", "USER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_AllergenCake_cake_CakesId",
                table: "AllergenCake",
                column: "CakesId",
                principalTable: "cake",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_cake_CakeTypes_CakeTypeId",
                table: "cake",
                column: "CakeTypeId",
                principalTable: "CakeTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_cake_Medias_MediaId",
                table: "cake",
                column: "MediaId",
                principalTable: "Medias",
                principalColumn: "Id");
        }
    }
}
