using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Relationships.PacientiXRay
{
    public class PacientiXRayDto
    {
        public int id { get; set; }

        public string PacientiId { get; set; }

        public int XRayId { get; set; }
    }
}