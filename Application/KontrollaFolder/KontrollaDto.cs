using System;
using Domain;
using Application.Pacient;
using Application.TerminiFolder;
using Application.TretmaniCourse;

namespace Application.KontrollaFolder
{
    public class KontrollaDto
    {
        public int Id { get; set; }
        public string EmriKontrolles { get; set; }
        public float Kosto { get; set ; }
        public string PacientiId { get; set; } 
        public PacientiDto Pacienti { get; set; }
        public int TretmaniId { get; set; }
        public TretmaniDto Tretmani { get; set; }
        public int TerminiId { get; set; }
        public TerminiDto Termini { get; set; }
    }
}