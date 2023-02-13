using System;
using Domain;
using Application.Pacient;
using Application.TerminiFolder;
using Application.TretmaniCourse;
using System.Collections.Generic;

namespace Application.KontrollaFolder
{
    public class KontrollaDto
    {
        public int Id { get; set; }
        public string EmriKontrolles { get; set; }
        public float Kosto { get; set ; }
        public ICollection <TretmaniDto> Tretmanet { get; set; } = new List<TretmaniDto>();
    }
}