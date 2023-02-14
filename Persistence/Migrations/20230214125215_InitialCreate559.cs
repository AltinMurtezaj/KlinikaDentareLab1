using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class InitialCreate559 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "XRays",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Data = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TretmaniId = table.Column<int>(type: "int", nullable: false),
                    PacientiId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_XRays", x => x.Id);
                    table.ForeignKey(
                        name: "FK_XRays_Tretmanet_TretmaniId",
                        column: x => x.TretmaniId,
                        principalTable: "Tretmanet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_XRays_Users_PacientiId",
                        column: x => x.PacientiId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_XRays_PacientiId",
                table: "XRays",
                column: "PacientiId",
                unique: true,
                filter: "[PacientiId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_XRays_TretmaniId",
                table: "XRays",
                column: "TretmaniId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "XRays");
        }
    }
}
