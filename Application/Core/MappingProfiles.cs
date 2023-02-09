using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.KontrollaFolder;
using Application.Pacient;
using Application.TerminiFolder;
using Application.TretmaniCourse;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Infermierja, Infermierja>();
            CreateMap<Doktori, Doktori>();
            CreateMap<Termini, Termini>();
            CreateMap<Laboranti, Laboranti>();
            CreateMap<Infermierja, Infermierja>();
            CreateMap<Pacienti, Pacienti>();     
            CreateMap<Kontrolla, Kontrolla>();
            CreateMap<Kontrolla, KontrollaDto>();
            CreateMap<KontrollaDto, Kontrolla>();
            CreateMap<PacientiDto, Pacienti>();
            CreateMap<Pacienti, PacientiDto>();
            CreateMap<Tretmani, Tretmani>();
            CreateMap<Tretmani, TretmaniDto>();
            CreateMap<TretmaniDto, Tretmani>();
            CreateMap<Termini, TerminiDto>();
            CreateMap<TerminiDto, Termini>();
            
         
         
        }
    }
}