using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class UpdateTermini12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LaborantiId",
                table: "Laboratori",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "LaborantiId1",
                table: "Laboratori",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Laboratori_LaborantiId1",
                table: "Laboratori",
                column: "LaborantiId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Laboratori_Users_LaborantiId1",
                table: "Laboratori",
                column: "LaborantiId1",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Laboratori_Users_LaborantiId1",
                table: "Laboratori");

            migrationBuilder.DropIndex(
                name: "IX_Laboratori_LaborantiId1",
                table: "Laboratori");

            migrationBuilder.DropColumn(
                name: "LaborantiId",
                table: "Laboratori");

            migrationBuilder.DropColumn(
                name: "LaborantiId1",
                table: "Laboratori");
        }
    }
}
