using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.TretmaniCourse;
using Application.PacientiDoktoriConnection;
using Application.Pacient;

namespace Application.XRayFolder
{
    public class XRayDto
    {
         public int Id { get; set; }
        public DateTime Data { get; set; }
    }
}