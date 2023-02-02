using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class UpdateTermini : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TerminiId",
                table: "Terminet",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TerminiId",
                table: "Kontrollat",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Kontrollat_TerminiId",
                table: "Kontrollat",
                column: "TerminiId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Kontrollat_Terminet_TerminiId",
                table: "Kontrollat",
                column: "TerminiId",
                principalTable: "Terminet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Kontrollat_Terminet_TerminiId",
                table: "Kontrollat");

            migrationBuilder.DropIndex(
                name: "IX_Kontrollat_TerminiId",
                table: "Kontrollat");

            migrationBuilder.DropColumn(
                name: "TerminiId",
                table: "Terminet");

            migrationBuilder.DropColumn(
                name: "TerminiId",
                table: "Kontrollat");
        }
    }
}
