using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.AppUserCourse;
using Application.PacientiDoktoriDTOsss;
using Application.TerminiFolder;
using Application.TretmaniCourse;

namespace Application.Doctor
{
    public class DoktoriDto : AppUserDto
    {
        public string Kualifikimi { get; set; }
        public string Specializimi { get; set; }
        public ICollection<PacientiDoktoriDto> PacientiDoktoret { get; set; } = new List<PacientiDoktoriDto>();
        public ICollection<TretmaniDto> Tretmanet { get; set; } = new List<TretmaniDto>();
        public ICollection<TerminiDto> Terminet { get; set; } = new List<TerminiDto>();
    }
}