using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Laboratori
    {
        public int Id { get; set; }
        public string Emri{ get; set; }
        public string LaborantiId { get; set; }
        public Laboranti Laboranti { get; set; }
        
    }
}