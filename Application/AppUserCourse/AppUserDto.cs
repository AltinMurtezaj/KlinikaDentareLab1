using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.AppUserCourse
{
    public class AppUserDto
    {
        public string Emri { get; set; }
        public string Mbiemri { get; set; }
        public string Datelindja { get; set; }
        public string NrKontaktues { get; set; }
        public string Gjinia { get; set; }
        public string Vendbanimi { get; set; }
        public string Discriminator { get; set; }
    }
}