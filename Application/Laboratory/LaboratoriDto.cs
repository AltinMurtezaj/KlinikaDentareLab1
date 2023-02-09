using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.LaborPerson;

namespace Application.Laboratory
{
    public class LaboratoriDto
    {
        public int Id { get; set; }
        public string Emri{ get; set; }

        public LaborantiDto Laboranti { get; set; }
        public int LaborantiId { get; set; }
    }
}