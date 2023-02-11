using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.TretmaniCourse;
using Application.Relationships.PacientiXRay;
using Application.PacientiDoktoriConnection;

namespace Application.XRayCourse
{
    public class XRayDto
    {
         public int Id { get; set; }
        public PacientiDoktoriDTO PacientiDoktori { get; set; }
        public DateTime Data { get; set; }
        public int TretmaniId { get; set; }
        public TretmaniDto Tretmani { get; set; }
        public ICollection<PacientiXRayDto> Pacientet { get; set; }
    }
}