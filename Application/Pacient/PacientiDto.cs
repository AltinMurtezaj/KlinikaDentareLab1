using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.AppUserCourse;
using Application.Payment;
using Application.TretmaniCourse;
using Application.TerminiFolder;
using Application.KontrollaFolder;
using Application.XRayFolder;
using Application.Doctor;
using Application.UdhezimetCourse;

namespace Application.Pacient
{
    public class PacientiDto
    {
        public string Id { get; set; }
        public string Emri { get; set; }
        public string Mbiemri { get; set; }
        public string UserName { get; set; }
        public string Datelindja { get; set; }
        public string Email { get; set; }
        public string NrKontaktues { get; set; }
        public string Gjinia { get; set; }
        public string Vendbanimi { get; set; }
        public string Discriminator {get; set;}
        public ICollection<TretmaniDto> Tretmanet { get; set; }
        public ICollection<XRayDto> XRays { get; set; }
        public ICollection<DoktoriDto> Doktoret { get; set; }
        public ICollection<TerminiDto> Terminet { get; set; }
        public ICollection<UdhezimiDto> Udhezimet { get; set; }
    }
}