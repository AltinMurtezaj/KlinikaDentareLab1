using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.TretmaniCourse;
using Application.PacientiDoktoriDTOsss;

namespace Application.XRayCourse
{
    public class XRayDto
    {
         public int Id { get; set; }
        public PacientiDoktoriDto PacientiDoktori { get; set; }
        public DateTime Data { get; set; }
        public int TretmaniId { get; set; }
        public TretmaniDto Tretmani { get; set; }
    }
}