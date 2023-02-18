using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Doktori : AppUser
    {
      
        public string Kualifikimi { get; set; }
        public string Specializimi { get; set; }
        public ICollection<PacientiDoktori> Pacientet { get; set; } = new List<PacientiDoktori>();
        public ICollection<Tretmani> Tretmanet { get; set; } = new List<Tretmani>();
        public ICollection<Termini> Terminet { get; set; } = new List<Termini>();
    }
}