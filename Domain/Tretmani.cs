using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Tretmani
    {
        public int Id { get; set; }
        public string Emri { get; set; }
        public string Pershkrimi { get; set; }
        public float Cmimi { get; set; }
        public string DokoriId { get; set; }
        public Doktori Doktori { get; set; }
        public int PagesaId { get; set; }
        public Pagesa Pagesa { get; set; }
        public string PacientId { get; set; }
        public Pacienti Pacienti { get; set;}
        public ICollection<Kontrolla> Kontrollat { get; set; } = new List<Kontrolla>();
        public ICollection<Udhezimi> Udhezimet { get; set; } = new List<Udhezimi>();
    }
}