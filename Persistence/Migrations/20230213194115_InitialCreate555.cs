using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class InitialCreate555 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleClaims", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserClaims", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserLogins",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProviderKey = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLogins", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Mbiemri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Datelindja = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NrKontaktues = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gjinia = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Vendbanimi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Kualifikimi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Specializimi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Infermierja_Kualifikimi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Infermierja_Specializimi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Laboranti_Kualifikimi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Laboranti_Specializimi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTokens", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Laboratori",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LaborantiId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Laboratori", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Laboratori_Users_LaborantiId",
                        column: x => x.LaborantiId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PacientiDoktoret",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PacientiId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    DoktoriId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PacientiDoktoret", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PacientiDoktoret_Users_DoktoriId",
                        column: x => x.DoktoriId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PacientiDoktoret_Users_PacientiId",
                        column: x => x.PacientiId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Terminet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Koha = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Data = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DoktoriId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Terminet", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Terminet_Users_DoktoriId",
                        column: x => x.DoktoriId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Kontrollat",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmriKontrolles = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Kosto = table.Column<float>(type: "real", nullable: false),
                    TerminiId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kontrollat", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Kontrollat_Terminet_TerminiId",
                        column: x => x.TerminiId,
                        principalTable: "Terminet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tretmanet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Pershkrimi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cmimi = table.Column<float>(type: "real", nullable: false),
                    DokoriId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    PacientId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    KontrollaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tretmanet", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tretmanet_Kontrollat_KontrollaId",
                        column: x => x.KontrollaId,
                        principalTable: "Kontrollat",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tretmanet_Users_DokoriId",
                        column: x => x.DokoriId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Tretmanet_Users_PacientId",
                        column: x => x.PacientId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Pagesat",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Shuma = table.Column<float>(type: "real", nullable: false),
                    MetodaPageses = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DataPageses = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TretmaniId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pagesat", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pagesat_Tretmanet_TretmaniId",
                        column: x => x.TretmaniId,
                        principalTable: "Tretmanet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Udhezimet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Doza = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TretmaniId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Udhezimet", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Udhezimet_Tretmanet_TretmaniId",
                        column: x => x.TretmaniId,
                        principalTable: "Tretmanet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Kontrollat_TerminiId",
                table: "Kontrollat",
                column: "TerminiId");

            migrationBuilder.CreateIndex(
                name: "IX_Laboratori_LaborantiId",
                table: "Laboratori",
                column: "LaborantiId");

            migrationBuilder.CreateIndex(
                name: "IX_PacientiDoktoret_DoktoriId",
                table: "PacientiDoktoret",
                column: "DoktoriId");

            migrationBuilder.CreateIndex(
                name: "IX_PacientiDoktoret_PacientiId",
                table: "PacientiDoktoret",
                column: "PacientiId");

            migrationBuilder.CreateIndex(
                name: "IX_Pagesat_TretmaniId",
                table: "Pagesat",
                column: "TretmaniId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Terminet_DoktoriId",
                table: "Terminet",
                column: "DoktoriId");

            migrationBuilder.CreateIndex(
                name: "IX_Tretmanet_DokoriId",
                table: "Tretmanet",
                column: "DokoriId");

            migrationBuilder.CreateIndex(
                name: "IX_Tretmanet_KontrollaId",
                table: "Tretmanet",
                column: "KontrollaId");

            migrationBuilder.CreateIndex(
                name: "IX_Tretmanet_PacientId",
                table: "Tretmanet",
                column: "PacientId");

            migrationBuilder.CreateIndex(
                name: "IX_Udhezimet_TretmaniId",
                table: "Udhezimet",
                column: "TretmaniId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Laboratori");

            migrationBuilder.DropTable(
                name: "PacientiDoktoret");

            migrationBuilder.DropTable(
                name: "Pagesat");

            migrationBuilder.DropTable(
                name: "RoleClaims");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Udhezimet");

            migrationBuilder.DropTable(
                name: "UserClaims");

            migrationBuilder.DropTable(
                name: "UserLogins");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "UserTokens");

            migrationBuilder.DropTable(
                name: "Tretmanet");

            migrationBuilder.DropTable(
                name: "Kontrollat");

            migrationBuilder.DropTable(
                name: "Terminet");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
