using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class InitialCreate32 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Terminet_Users_DoktoriId1",
                table: "Terminet");

            migrationBuilder.DropForeignKey(
                name: "FK_Terminet_Users_PacientiId",
                table: "Terminet");

            migrationBuilder.DropIndex(
                name: "IX_Terminet_DoktoriId1",
                table: "Terminet");

            migrationBuilder.DropIndex(
                name: "IX_Terminet_PacientiId",
                table: "Terminet");

            migrationBuilder.DropColumn(
                name: "DoktoriId1",
                table: "Terminet");

            migrationBuilder.DropColumn(
                name: "PacientiId",
                table: "Terminet");

            migrationBuilder.RenameColumn(
                name: "TerminiId",
                table: "Terminet",
                newName: "KontrollaId");

            migrationBuilder.AlterColumn<string>(
                name: "PacientId",
                table: "Terminet",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "DoktoriId",
                table: "Terminet",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Terminet_DoktoriId",
                table: "Terminet",
                column: "DoktoriId");

            migrationBuilder.CreateIndex(
                name: "IX_Terminet_PacientId",
                table: "Terminet",
                column: "PacientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Terminet_Users_DoktoriId",
                table: "Terminet",
                column: "DoktoriId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Terminet_Users_PacientId",
                table: "Terminet",
                column: "PacientId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Terminet_Users_DoktoriId",
                table: "Terminet");

            migrationBuilder.DropForeignKey(
                name: "FK_Terminet_Users_PacientId",
                table: "Terminet");

            migrationBuilder.DropIndex(
                name: "IX_Terminet_DoktoriId",
                table: "Terminet");

            migrationBuilder.DropIndex(
                name: "IX_Terminet_PacientId",
                table: "Terminet");

            migrationBuilder.RenameColumn(
                name: "KontrollaId",
                table: "Terminet",
                newName: "TerminiId");

            migrationBuilder.AlterColumn<int>(
                name: "PacientId",
                table: "Terminet",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "DoktoriId",
                table: "Terminet",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DoktoriId1",
                table: "Terminet",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PacientiId",
                table: "Terminet",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Terminet_DoktoriId1",
                table: "Terminet",
                column: "DoktoriId1");

            migrationBuilder.CreateIndex(
                name: "IX_Terminet_PacientiId",
                table: "Terminet",
                column: "PacientiId");

            migrationBuilder.AddForeignKey(
                name: "FK_Terminet_Users_DoktoriId1",
                table: "Terminet",
                column: "DoktoriId1",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Terminet_Users_PacientiId",
                table: "Terminet",
                column: "PacientiId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
