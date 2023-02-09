using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class InitialCreate22 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Kontrollat_Users_PacientiId1",
                table: "Kontrollat");

            migrationBuilder.DropIndex(
                name: "IX_Kontrollat_PacientiId1",
                table: "Kontrollat");

            migrationBuilder.DropColumn(
                name: "PacientiId1",
                table: "Kontrollat");

            migrationBuilder.AlterColumn<string>(
                name: "PacientiId",
                table: "Kontrollat",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Kontrollat_PacientiId",
                table: "Kontrollat",
                column: "PacientiId");

            migrationBuilder.AddForeignKey(
                name: "FK_Kontrollat_Users_PacientiId",
                table: "Kontrollat",
                column: "PacientiId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Kontrollat_Users_PacientiId",
                table: "Kontrollat");

            migrationBuilder.DropIndex(
                name: "IX_Kontrollat_PacientiId",
                table: "Kontrollat");

            migrationBuilder.AlterColumn<int>(
                name: "PacientiId",
                table: "Kontrollat",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PacientiId1",
                table: "Kontrollat",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Kontrollat_PacientiId1",
                table: "Kontrollat",
                column: "PacientiId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Kontrollat_Users_PacientiId1",
                table: "Kontrollat",
                column: "PacientiId1",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
