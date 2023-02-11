using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.KontrollaFolder;
using Application.UdhezimetCourse;

namespace Application.TretmaniCourse
{
    public class TretmaniDto
    {
        public int Id { get; set; }
        public string Emri { get; set; }
        public string Pershkrimi { get; set; }
        public float Cmimi { get; set; }
        public string DoktoriId { get; set; }
        public ICollection<KontrollaDto> Kontrollat { get; set; } = new List<KontrollaDto>();
        public ICollection<UdhezimiDto> Udhezimet { get; set; } = new List<UdhezimiDto>();

        
        
    }
}