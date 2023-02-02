using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.DoktoriDTO
{
    public class DoktoriRegisterDTO
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
        [Required]
        public string Kualifikimi { get; set; }
        [Required]
        public string Specializimi { get; set; }
        

    }
}