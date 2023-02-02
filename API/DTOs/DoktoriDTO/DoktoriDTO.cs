using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.DoktoriDTO
{
    public class DoktoriDTO : UserDto
    {
        public string Kualifikimi { get; set; }
        public string Specializimi { get; set; }
    }
}