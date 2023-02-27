using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Terminiiiiiiii : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PacientiId",
                table: "Udhezimet",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Udhezimet_PacientiId",
                table: "Udhezimet",
                column: "PacientiId");

            migrationBuilder.AddForeignKey(
                name: "FK_Udhezimet_Users_PacientiId",
                table: "Udhezimet",
                column: "PacientiId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Udhezimet_Users_PacientiId",
                table: "Udhezimet");

            migrationBuilder.DropIndex(
                name: "IX_Udhezimet_PacientiId",
                table: "Udhezimet");

            migrationBuilder.DropColumn(
                name: "PacientiId",
                table: "Udhezimet");
        }
    }
}
