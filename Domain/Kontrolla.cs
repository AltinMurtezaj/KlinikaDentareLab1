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
        public int TerminiId { get; set; }
        public Termini Termini { get; set; }
        public ICollection <Tretmani> Tretmanet { get; set; } = new List<Tretmani>();
    }
}