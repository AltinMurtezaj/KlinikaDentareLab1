using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.InfermierjaDTO
{
    public class InfermierjaDTO : UserDto
    {
        public string Kualifikimi {get;set;}
        public string Specializimi {get;set;}
    }
}