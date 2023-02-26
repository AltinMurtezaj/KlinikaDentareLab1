
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Pacienti : AppUser
    {
        public ICollection<PacientiDoktori> Doktoret { get; set; } = new List<PacientiDoktori>();
        public ICollection<Tretmani> Tretmanet { get; set; } = new List<Tretmani>();
        public ICollection<XRay> XRays { get; set; } = new List<XRay>();
        public ICollection<Termini> Terminet { get; set; } = new List<Termini>();
    }
}