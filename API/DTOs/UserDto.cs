using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UserDto
    {
        public string Id { get; set; }
        public string Token { get; set; }
        public string Email {get; set;}
        public string Emri { get; set; }
        public string Mbiemri { get; set; }
        public string UserName {get;set;}
        public string Datelindja { get; set; }
        public string NrKontaktues { get; set; }
        public string Gjinia { get; set; }
        public string Vendbanimi { get; set; }
        public string Discriminator {get; set;}

    }
}