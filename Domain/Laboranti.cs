using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Laboranti : AppUser
    {
        public string Kualifikimi { get; set; }
        public string Specializimi { get; set; }
        public ICollection<Laboratori> Laboratoret { get; set; } = new List<Laboratori>();
    }
}