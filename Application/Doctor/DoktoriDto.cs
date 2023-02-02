using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Doctor
{
    public class DoktoriDto
    {
        public string Id { get; set; }
        public string Emri { get; set; }
        public string Mbiemri { get; set; }
        public string Mosha { get; set; }
        public string Gjinia { get; set; }
        public string Vendbanimi { get; set; }
        public string Username { get; set; }
        public string Kualifikimi { get; set; }
        public string Specializimi { get; set; }
        public string NrKontaktues { get; set; }
        public string Email { get; set; }
        public string Discriminator { get; set; }
    }
}