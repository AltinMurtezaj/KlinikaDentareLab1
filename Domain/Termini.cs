using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain
{
    public class Termini
    {
        public int Id {get;set;}
        public string Koha {get;set;}
        public DateTime Data {get;set;}
        public string PacientiId {get;set;}
        public Pacienti Pacienti {get;set;}
        public ICollection <Kontrolla> Kontrollat { get; set; } = new List<Kontrolla>();
    }
}