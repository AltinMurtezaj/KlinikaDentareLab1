using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Pagesa
    {
        public int Id { get; set; }
        public float Shuma { get; set; }
        public string MetodaPageses { get; set; }
        public DateTime DataPageses { get; set; }
        public int TretmaniId { get; set; }
        public Tretmani Tretmani { get; set; }
    }
}