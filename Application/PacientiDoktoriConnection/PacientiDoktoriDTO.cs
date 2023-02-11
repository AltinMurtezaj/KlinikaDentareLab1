using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.XRayCourse;

namespace Application.PacientiDoktoriConnection
{
    public class PacientiDoktoriDTO
    {
        public int id {get;set;}
        public string PacientiId { get; set; }
        public string DoktoriId {get;set;}

    }
}