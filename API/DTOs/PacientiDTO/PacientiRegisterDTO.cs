using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.PacientiDTO
{
    public class PacientiRegisterDTO
    {
        [Required]
        public string Emri { get; set; }
        [Required]
        public string Mbiemri { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Datelindja { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }  
        [Required] 
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage ="Password must be complex")]
        public string Password { get; set; }
        [Required]
        public string NrKontaktues { get; set; }
        [Required]
        public string Gjinia { get; set; }
        [Required]
        public string Vendbanimi { get; set; }
        public string Kualifikimi {get;set;}
        public string Specializimi {get;set;}
    
        

    }
}