using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.AppUserCourse;
using Application.PacientiDoktoriDTOsss;
using Application.Payment;
using Application.TretmaniCourse;
using Application.TerminiFolder;
using Application.KontrollaFolder;

namespace Application.Pacient
{
    public class PacientiDto: AppUserDto
    {
        public ICollection<PacientiDoktoriDto> PacientiDoktoret { get; set; } = new List<PacientiDoktoriDto>();
        public ICollection<KontrollaDto> Kontrollat { get; set; } = new List<KontrollaDto>();
        public ICollection<TerminiDto> Terminet { get; set; } = new List<TerminiDto>();
        public ICollection<PagesaDto> Pagesat { get; set; } = new List<PagesaDto>();
        public ICollection<TretmaniDto> Tretmanet { get; set; } = new List<TretmaniDto>();
    }
}