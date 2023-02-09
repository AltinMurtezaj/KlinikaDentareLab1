using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Laboratory;

namespace Application.LaborPerson
{
    public class LaborantiDto
    {
        public string Kualifikimi { get; set; }
        public String Specializimi { get; set; }
        public ICollection<LaboratoriDto> Laboratori { get; set; } = new List<LaboratoriDto>();
        
    }
}