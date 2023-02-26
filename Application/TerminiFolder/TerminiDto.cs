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
        public string PacientiId {get;set;}
        public PacientiDto Pacienti {get;set;}
        public ICollection<KontrollaDto> Kontrollat { get; set; } = new List<KontrollaDto>();
    }
}