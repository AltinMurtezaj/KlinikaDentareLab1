using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.AppUserCourse;
using Application.Pacient;
using Application.TerminiFolder;
using Application.TretmaniCourse;

namespace Application.Doctor
{
    public class DoktoriDto
    {
        public string Id { get; set; }
        public string Emri { get; set; }
        public string Mbiemri { get; set; }
        public string UserName { get; set; }
        public string Datelindja { get; set; }
        public string Email { get; set; }
        public string NrKontaktues { get; set; }
        public string Gjinia { get; set; }
        public string Vendbanimi { get; set; }
        public string Discriminator {get; set;}
        public string Kualifikimi { get; set; }
        public string Specializimi { get; set; }
        public ICollection<TretmaniDto> Tretmanet { get; set; }
    }
}