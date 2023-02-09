using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Relationships
{
    public class PacientiXRay
    {
        public int id {get;set;}

        public string PacientiId{get;set;}

        public Pacienti Pacienti{get;set;}

        public int XRayId{get;set;}

        public XRay XRay{get;set;}
    }
}