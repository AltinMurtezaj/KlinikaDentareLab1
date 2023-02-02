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
        public int PacientId { get; set; }
        public Pacienti Pacienti { get; set; }
        public int DoktoriId { get; set; }
        public Doktori Doktori { get; set; }
        public int TerminiId { get; set; }
        public Kontrolla Kontrolla { get; set; }
    }
}