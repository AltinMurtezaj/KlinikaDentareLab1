
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Relationships;

namespace Domain
{
    public class Pacienti : AppUser
    {
        public ICollection<PacientiDoktori> PacientiDoktoret { get; set; } = new List<PacientiDoktori>();
        public ICollection<Kontrolla> Kontrollat { get; set; } = new List<Kontrolla>();
        public ICollection<Termini> Terminet { get; set; } = new List<Termini>();
        public ICollection<Pagesa> Pagesat { get; set; } = new List<Pagesa>();
        public ICollection<Tretmani> Tretmanet { get; set; } = new List<Tretmani>();
        public ICollection<XRay> XRays { get; set; } = new List<XRay>();
    }
}