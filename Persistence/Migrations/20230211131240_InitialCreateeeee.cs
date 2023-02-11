using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class InitialCreateeeee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_XRays_Tretmanet_TretmaniId",
                table: "XRays");

            migrationBuilder.AlterColumn<int>(
                name: "TretmaniId",
                table: "XRays",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "PacientiId",
                table: "XRays",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "PacientiId1",
                table: "XRays",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_XRays_PacientiId1",
                table: "XRays",
                column: "PacientiId1");

            migrationBuilder.AddForeignKey(
                name: "FK_XRays_Tretmanet_TretmaniId",
                table: "XRays",
                column: "TretmaniId",
                principalTable: "Tretmanet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_XRays_Users_PacientiId1",
                table: "XRays",
                column: "PacientiId1",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_XRays_Tretmanet_TretmaniId",
                table: "XRays");

            migrationBuilder.DropForeignKey(
                name: "FK_XRays_Users_PacientiId1",
                table: "XRays");

            migrationBuilder.DropIndex(
                name: "IX_XRays_PacientiId1",
                table: "XRays");

            migrationBuilder.DropColumn(
                name: "PacientiId",
                table: "XRays");

            migrationBuilder.DropColumn(
                name: "PacientiId1",
                table: "XRays");

            migrationBuilder.AlterColumn<int>(
                name: "TretmaniId",
                table: "XRays",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_XRays_Tretmanet_TretmaniId",
                table: "XRays",
                column: "TretmaniId",
                principalTable: "Tretmanet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
