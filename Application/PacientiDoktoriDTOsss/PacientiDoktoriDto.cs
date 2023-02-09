using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Doctor;
using Application.Pacient;

namespace Application.PacientiDoktoriDTOsss
{
    public class PacientiDoktoriDto
    {
        public int Id;
        public string PacientiId { get; set; }
        public PacientiDto Pacienti { get; set; }
        public string DoktoriId { get; set; }
        public DoktoriDto Doktori { get; set; }
    }
}