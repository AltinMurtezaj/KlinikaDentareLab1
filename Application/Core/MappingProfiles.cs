using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.KontrollaFolder;
using Application.Pacient;
using Application.PacientiDoktoriConnection;
using Application.Relationships.PacientiXRay;
using Application.TerminiFolder;
using Application.TretmaniCourse;
using Application.XRayCourse;
using AutoMapper;
using Domain;
using Domain.Relationships;

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
            CreateMap<XRay, PacientiXRayDto>();
            CreateMap<Pacienti, PacientiXRayDto>();
            CreateMap<Pacienti, XRay>();
            CreateMap<PacientiDto, XRay>();
            CreateMap<PacientiXRay, PacientiXRayDto>();
            CreateMap<XRay, XRayDto>();
            CreateMap<PacientiDoktori, PacientiDoktoriDTO>();
            CreateMap<PacientiDoktoriDTO, PacientiDoktori>();
            
         
         
        }
    }
}