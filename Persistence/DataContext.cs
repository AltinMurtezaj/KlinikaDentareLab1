using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DbSet<Infermierja> Infermjeret{get;set;}
        public DbSet<Doktori> Doktoret {get;set;}
        public DbSet<Pacienti> Pacientet {get;set;}
        public DbSet<Termini> Terminet{get;set;}
        public DbSet<Laboranti> Laborantet {get; set;}
        public DbSet<Laboratori> Laboratori { get; set; }
        public DbSet<Kontrolla> Kontrollat { get; set; }
        public DbSet<Pagesa> Pagesat { get; set; }
        public DbSet<Tretmani> Tretmanet { get; set; }
        public DbSet<XRay> XRays { get; set; }
        public DbSet<Udhezimi> Udhezimet { get; set; }

        public DbSet<PacientiDoktori> PacientiDoktoret { get; set; }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<PacientiDoktori>(x => x.HasKey(pp => new {pp.Id}));
            builder.Entity<IdentityUserToken<string>>().HasKey(c=>c.UserId);
            builder.Entity<IdentityUserLogin<string>>().HasKey(c=>c.UserId);
            builder.Entity<IdentityUserRole<string>>().HasKey(c=>c.UserId);

            builder.Entity<PacientiDoktori>()
                .HasOne(pd => pd.Pacienti)
                .WithMany(p => p.PacientiDoktoret)
                .HasForeignKey(pp => pp.PacientiId);

            builder.Entity<PacientiDoktori>()
                .HasOne(pd => pd.Doktori)
                .WithMany(d => d.PacientiDoktoret)
                .HasForeignKey(pp => pp.DoktoriId);
            
            builder.Entity<Tretmani>()
            .HasOne(t => t.Pacienti)
            .WithMany(p => p.Tretmanet)
            .HasForeignKey(t => t.PacientId);

            builder.Entity<Tretmani>()
                .HasOne(t => t.Doktori)
                .WithMany(d => d.Tretmanet)
                .HasForeignKey(t => t.DokoriId);

            builder.Entity<Kontrolla>()
            .HasOne(p => p.Tretmani)
            .WithMany(t => t.Kontrollat)
            .HasForeignKey(p => p.TretmaniId);

            builder.Entity<Tretmani>()
            .HasOne(pp => pp.Pagesa)
            .WithOne(u => u.Tretmani)
            .HasForeignKey<Pagesa>(pp => pp.TretmaniId);
        }
    }

}