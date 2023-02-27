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
        public DbSet<Udhezimi> Udhezimet { get; set; }
        public DbSet<PacientiDoktori> PacientiDoktoret { get; set; }
        public DbSet<XRay> XRays { get; set; }

        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<PacientiDoktori>(x => x.HasKey(pp => new {pp.Id}));
            builder.Entity<IdentityUserToken<string>>().HasKey(c=>c.UserId);
            builder.Entity<IdentityUserLogin<string>>().HasKey(c=>c.UserId);
            builder.Entity<IdentityUserRole<string>>().HasKey(c=>c.UserId);

            builder.Entity<PacientiDoktori>()
                .HasOne(pd => pd.Pacienti)
                .WithMany(p => p.Doktoret)
                .HasForeignKey(pp => pp.PacientiId);

            builder.Entity<PacientiDoktori>()
                .HasOne(pd => pd.Doktori)
                .WithMany(d => d.Pacientet)
                .HasForeignKey(pp => pp.DoktoriId);
            
            builder.Entity<Tretmani>()
                .HasOne(pd => pd.Pacienti)
                .WithMany(p => p.Tretmanet)
                .HasForeignKey(pp => pp.PacientId);

            builder.Entity<Tretmani>()
                .HasOne(pd => pd.Doktori)
                .WithMany(d => d.Tretmanet)
                .HasForeignKey(pp => pp.DoktoriId);
               
            builder.Entity<Tretmani>()  
                .HasOne(pd => pd.Pagesa)
                .WithOne(d => d.Tretmani)
                .HasForeignKey<Pagesa>(pp => pp.TretmaniId);

            builder.Entity<Kontrolla>()
                .HasOne(pd => pd.Termini)
                .WithMany(d => d.Kontrollat)
                .HasForeignKey(pp => pp.TerminiId);
                
            builder.Entity<Tretmani>()
                .HasOne(pd => pd.Kontrolla)
                .WithMany(d => d.Tretmanet)
                .HasForeignKey(pp => pp.KontrollaId);

            builder.Entity<Pagesa>()
                .HasOne(pd => pd.Tretmani)
                .WithOne(d => d.Pagesa)
                .HasForeignKey<Pagesa>(pp => pp.TretmaniId);
            builder.Entity<Laboratori>()
                .HasOne(pd => pd.Laboranti)
                .WithMany(d => d.Laboratoret)
                .HasForeignKey(pp => pp.LaborantiId);
            builder.Entity<Udhezimi>()
            .HasOne(u => u.Tretmani)
            .WithMany(t => t.Udhezimet)
            .HasForeignKey(u => u.TretmaniId);
            builder.Entity<Tretmani>()  
                .HasOne(pd => pd.Pagesa)
                .WithOne(d => d.Tretmani)
                .HasForeignKey<Pagesa>(pp => pp.TretmaniId);
            builder.Entity<XRay>()
                .HasOne(x => x.Tretmani)
                .WithMany(d => d.XRays)
                .HasForeignKey(dd => dd.TretmaniId);
            builder.Entity<XRay>()
                .HasOne(xx => xx.Pacienti)
                .WithMany(dd => dd.XRays)
                .HasForeignKey(dd => dd.PacientiId);
            builder.Entity<Termini>()
                .HasOne(t => t.Pacienti)
                .WithMany(p => p.Terminet)
                .HasForeignKey(t => t.PacientiId);
            builder.Entity<Pacienti>()
                .HasMany(p => p.Terminet)
                .WithOne(t => t.Pacienti)
                .HasForeignKey(t => t.PacientiId);
            builder.Entity<Pacienti>()
                .HasMany(p => p.XRays)
                .WithOne(t => t.Pacienti)
                .HasForeignKey(t => t.PacientiId);
            builder.Entity<Pacienti>()
                .HasMany(p => p.Udhezimet)
                .WithOne(t => t.Pacienti)
                .HasForeignKey(t => t.PacientiId);
            builder.Entity<Udhezimi>()
                .HasOne(u => u.Pacienti)
                .WithMany(p => p.Udhezimet)
                .HasForeignKey(u => u.PacientiId);
           
               
        }
    }

}