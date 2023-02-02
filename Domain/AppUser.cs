using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{

    public class AppUser : IdentityUser
    {
        public string Emri { get; set; }
        public string Mbiemri { get; set; }
        public string Datelindja { get; set; }
        public string NrKontaktues { get; set; }
        public string Gjinia { get; set; }
        public string Vendbanimi { get; set; }
        public string Discriminator {get; set;}
    }
}