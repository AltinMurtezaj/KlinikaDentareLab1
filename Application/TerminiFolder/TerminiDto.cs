using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Pacient;
using Application.Doctor;
using Application.KontrollaFolder;

namespace Application.TerminiFolder
{
    public class TerminiDto
    {
        public int Id {get;set;}
        public string Koha {get;set;}
        public DateTime Data {get;set;}
        public string PacientId { get; set; }
        public PacientiDto Pacienti { get; set; }
        public string DoktoriId { get; set; }
        public DoktoriDto Doktori { get; set; }
        public int KontrollaId { get; set; }
        public KontrollaDto Kontrolla { get; set; }
    }
}