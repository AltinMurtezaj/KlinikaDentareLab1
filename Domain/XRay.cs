using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class XRay
    {
        public int Id { get; set; }
        public DateTime Data { get; set; }
        public int TretmaniId { get; set; }
        public Tretmani Tretmani { get; set; }
        public string PacientiId { get; set; }
        public Pacienti Pacienti { get; set; }
    }
}