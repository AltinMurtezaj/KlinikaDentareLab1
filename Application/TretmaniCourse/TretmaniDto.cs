using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.KontrollaFolder;
using Application.UdhezimetCourse;
using Application.XRayFolder;
using Domain;

namespace Application.TretmaniCourse
{
    public class TretmaniDto
    {
        public int Id { get; set; }
        public string Emri { get; set; }
        public string Pershkrimi { get; set; }
        public float Cmimi { get; set; }
        public ICollection<UdhezimiDto> Udhezimet { get; set; } = new List<UdhezimiDto>();
        public ICollection<XRayDto> XRays { get; set; } = new List<XRayDto>(); 
        public int KontrollaId {get; set;}
    }
}