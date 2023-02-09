using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Pacient;

namespace Application.TerminiFolder
{
    public class TerminiDto
    {
        public int Id {get;set;}
        public string Koha {get;set;}
        public DateTime Data {get;set;}
        public string PacientId { get; set; }
        public PacientiDto Pacienti { get; set; }
    }
}