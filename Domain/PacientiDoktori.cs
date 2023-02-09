using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class PacientiDoktori
    {
        public int Id;
        public string PacientiId { get; set; }
        public Pacienti Pacienti { get; set; }
        public string DoktoriId { get; set; }
        public Doktori Doktori { get; set; }
        public ICollection<XRay> XRay = new List<XRay>();
    }
}