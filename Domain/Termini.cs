using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Termini
    {
        public int Id {get;set;}
        public string Koha {get;set;}
        public DateTime Data {get;set;}
        public string PacientId { get; set; }
        public Pacienti Pacienti { get; set; }
        public string DoktoriId { get; set; }
        public Doktori Doktori { get; set; }
        public int KontrollaId { get; set; }
        public Kontrolla Kontrolla { get; set; }
    }
}