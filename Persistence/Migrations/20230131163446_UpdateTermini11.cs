using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class UpdateTermini11 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Pagesat_TretmaniId",
                table: "Pagesat");

            migrationBuilder.AddColumn<int>(
                name: "PagesaId",
                table: "Tretmanet",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Pagesat_TretmaniId",
                table: "Pagesat",
                column: "TretmaniId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Pagesat_TretmaniId",
                table: "Pagesat");

            migrationBuilder.DropColumn(
                name: "PagesaId",
                table: "Tretmanet");

            migrationBuilder.CreateIndex(
                name: "IX_Pagesat_TretmaniId",
                table: "Pagesat",
                column: "TretmaniId");
        }
    }
}
