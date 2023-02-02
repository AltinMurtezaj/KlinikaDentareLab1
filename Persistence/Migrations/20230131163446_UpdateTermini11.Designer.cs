﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20230131163446_UpdateTermini11")]
    partial class UpdateTermini11
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("Domain.AppUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Datelindja")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("Emri")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gjinia")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("Mbiemri")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NrKontaktues")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Vendbanimi")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasDiscriminator<string>("Discriminator").HasValue("AppUser");
                });

            modelBuilder.Entity("Domain.Kontrolla", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("EmriKontrolles")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("Kosto")
                        .HasColumnType("real");

                    b.Property<int>("PacientiId")
                        .HasColumnType("int");

                    b.Property<string>("PacientiId1")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("TerminiId")
                        .HasColumnType("int");

                    b.Property<int>("TretmaniId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PacientiId1");

                    b.HasIndex("TerminiId")
                        .IsUnique();

                    b.HasIndex("TretmaniId");

                    b.ToTable("Kontrollat");
                });

            modelBuilder.Entity("Domain.Laboratori", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Emri")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Laboratori");
                });

            modelBuilder.Entity("Domain.PacientiDoktori", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("DoktoriId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("PacientiId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("DoktoriId");

                    b.HasIndex("PacientiId");

                    b.ToTable("PacientiDoktoret");
                });

            modelBuilder.Entity("Domain.Pagesa", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<DateTime>("DataPageses")
                        .HasColumnType("datetime2");

                    b.Property<string>("MetodaPageses")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PacientiId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<float>("Shuma")
                        .HasColumnType("real");

                    b.Property<int>("TretmaniId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PacientiId");

                    b.HasIndex("TretmaniId")
                        .IsUnique();

                    b.ToTable("Pagesat");
                });

            modelBuilder.Entity("Domain.Termini", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<DateTime>("Data")
                        .HasColumnType("datetime2");

                    b.Property<int>("DoktoriId")
                        .HasColumnType("int");

                    b.Property<string>("DoktoriId1")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Koha")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PacientId")
                        .HasColumnType("int");

                    b.Property<string>("PacientiId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("TerminiId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("DoktoriId1");

                    b.HasIndex("PacientiId");

                    b.ToTable("Terminet");
                });

            modelBuilder.Entity("Domain.Tretmani", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<float>("Cmimi")
                        .HasColumnType("real");

                    b.Property<string>("DokoriId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Emri")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PacientId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("PagesaId")
                        .HasColumnType("int");

                    b.Property<string>("Pershkrimi")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DokoriId");

                    b.HasIndex("PacientId");

                    b.ToTable("Tretmanet");
                });

            modelBuilder.Entity("Domain.Udhezimi", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Doza")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Emri")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TretmaniId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TretmaniId");

                    b.ToTable("Udhezimet");
                });

            modelBuilder.Entity("Domain.XRay", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<DateTime>("Data")
                        .HasColumnType("datetime2");

                    b.Property<int>("TretmaniId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TretmaniId");

                    b.ToTable("XRays");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NormalizedName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("RoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("UserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("UserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("UserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("UserTokens");
                });

            modelBuilder.Entity("Domain.Doktori", b =>
                {
                    b.HasBaseType("Domain.AppUser");

                    b.Property<string>("Kualifikimi")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Specializimi")
                        .HasColumnType("nvarchar(max)");

                    b.HasDiscriminator().HasValue("Doktori");
                });

            modelBuilder.Entity("Domain.Infermierja", b =>
                {
                    b.HasBaseType("Domain.AppUser");

                    b.Property<string>("Kualifikimi")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Infermierja_Kualifikimi");

                    b.Property<string>("Specializimi")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Infermierja_Specializimi");

                    b.HasDiscriminator().HasValue("Infermierja");
                });

            modelBuilder.Entity("Domain.Laboranti", b =>
                {
                    b.HasBaseType("Domain.AppUser");

                    b.Property<string>("Kualifikimi")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Laboranti_Kualifikimi");

                    b.Property<string>("Specializimi")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Laboranti_Specializimi");

                    b.HasDiscriminator().HasValue("Laboranti");
                });

            modelBuilder.Entity("Domain.Pacienti", b =>
                {
                    b.HasBaseType("Domain.AppUser");

                    b.HasDiscriminator().HasValue("Pacienti");
                });

            modelBuilder.Entity("Domain.Kontrolla", b =>
                {
                    b.HasOne("Domain.Pacienti", "Pacienti")
                        .WithMany("Kontrollat")
                        .HasForeignKey("PacientiId1");

                    b.HasOne("Domain.Termini", "Termini")
                        .WithOne("Kontrolla")
                        .HasForeignKey("Domain.Kontrolla", "TerminiId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Tretmani", "Tretmani")
                        .WithMany("Kontrollat")
                        .HasForeignKey("TretmaniId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pacienti");

                    b.Navigation("Termini");

                    b.Navigation("Tretmani");
                });

            modelBuilder.Entity("Domain.PacientiDoktori", b =>
                {
                    b.HasOne("Domain.Doktori", "Doktori")
                        .WithMany("PacientiDoktoret")
                        .HasForeignKey("DoktoriId");

                    b.HasOne("Domain.Pacienti", "Pacienti")
                        .WithMany("PacientiDoktoret")
                        .HasForeignKey("PacientiId");

                    b.Navigation("Doktori");

                    b.Navigation("Pacienti");
                });

            modelBuilder.Entity("Domain.Pagesa", b =>
                {
                    b.HasOne("Domain.Pacienti", null)
                        .WithMany("Pagesat")
                        .HasForeignKey("PacientiId");

                    b.HasOne("Domain.Tretmani", "Tretmani")
                        .WithOne("Pagesa")
                        .HasForeignKey("Domain.Pagesa", "TretmaniId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Tretmani");
                });

            modelBuilder.Entity("Domain.Termini", b =>
                {
                    b.HasOne("Domain.Doktori", "Doktori")
                        .WithMany("Terminet")
                        .HasForeignKey("DoktoriId1");

                    b.HasOne("Domain.Pacienti", "Pacienti")
                        .WithMany("Terminet")
                        .HasForeignKey("PacientiId");

                    b.Navigation("Doktori");

                    b.Navigation("Pacienti");
                });

            modelBuilder.Entity("Domain.Tretmani", b =>
                {
                    b.HasOne("Domain.Doktori", "Doktori")
                        .WithMany("Tretmanet")
                        .HasForeignKey("DokoriId");

                    b.HasOne("Domain.Pacienti", "Pacienti")
                        .WithMany("Tretmanet")
                        .HasForeignKey("PacientId");

                    b.Navigation("Doktori");

                    b.Navigation("Pacienti");
                });

            modelBuilder.Entity("Domain.Udhezimi", b =>
                {
                    b.HasOne("Domain.Tretmani", "Tretmani")
                        .WithMany()
                        .HasForeignKey("TretmaniId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Tretmani");
                });

            modelBuilder.Entity("Domain.XRay", b =>
                {
                    b.HasOne("Domain.Tretmani", "Tretmani")
                        .WithMany()
                        .HasForeignKey("TretmaniId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Tretmani");
                });

            modelBuilder.Entity("Domain.Termini", b =>
                {
                    b.Navigation("Kontrolla");
                });

            modelBuilder.Entity("Domain.Tretmani", b =>
                {
                    b.Navigation("Kontrollat");

                    b.Navigation("Pagesa");
                });

            modelBuilder.Entity("Domain.Doktori", b =>
                {
                    b.Navigation("PacientiDoktoret");

                    b.Navigation("Terminet");

                    b.Navigation("Tretmanet");
                });

            modelBuilder.Entity("Domain.Pacienti", b =>
                {
                    b.Navigation("Kontrollat");

                    b.Navigation("PacientiDoktoret");

                    b.Navigation("Pagesat");

                    b.Navigation("Terminet");

                    b.Navigation("Tretmanet");
                });
#pragma warning restore 612, 618
        }
    }
}
