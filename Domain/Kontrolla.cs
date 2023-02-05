using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Kontrolla
    {
        public int Id { get; set; }
        public string EmriKontrolles { get; set; }
        public float Kosto { get; set ; }
        public int PacientiId { get; set; } 
        public Pacienti Pacienti { get; set; }
        public int TretmaniId { get; set; }
        public Tretmani Tretmani { get; set; }
        public int TerminiId { get; set; }
        public Termini Termini { get; set; }
    }
}