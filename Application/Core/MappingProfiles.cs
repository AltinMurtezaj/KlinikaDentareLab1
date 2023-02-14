using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Doctor;
using Application.KontrollaFolder;
using Application.Laboratory;
using Application.LaborPerson;
using Application.Nurse;
using Application.Pacient;
using Application.PacientiDoktoriConnection;
using Application.Payment;
using Application.TerminiFolder;
using Application.TretmaniCourse;
using Application.UdhezimetCourse;
using Application.XRayFolder;
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
            CreateMap<PacientiDoktori, PacientiDoktoriDTO>();
            CreateMap<PacientiDoktoriDTO, PacientiDoktori>();
            CreateMap<PacientiDoktori, PacientiDoktori>();
            CreateMap<Doktori, DoktoriDto>();
            CreateMap<DoktoriDto, Doktori>();
            CreateMap<Laboranti, LaborantiDto>();
            CreateMap<LaborantiDto, Laboranti>();
            CreateMap<Infermierja, InfermierjaDto>();
            CreateMap<InfermierjaDto, Infermierja>();
            CreateMap<Udhezimi, UdhezimiDto>();
            CreateMap<UdhezimiDto, Udhezimi>();
            CreateMap<Udhezimi, Udhezimi>();
            CreateMap<Pagesa, PagesaDto>();
            CreateMap<PagesaDto, Pagesa>();
            CreateMap<Pagesa, Pagesa>();
            CreateMap<Laboratori, LaboratoriDto>();
            CreateMap<LaboratoriDto, Laboratori>();
            CreateMap<Laboratori, Laboratori>();
            CreateMap<XRay, XRay>();
            CreateMap<XRay, XRayDto>();
            CreateMap<XRayDto, XRay>();
            


            // // CreateMap<PacientiXRay, PacientiDto>()
            // // .ForMember(d => d.Id, o => o.MapFrom(s => s.Pacienti.Id))
            // // .ForMember(d => d.Emri, o => o.MapFrom(s => s.Pacienti.Emri))
            // // .ForMember(d => d.Mbiemri, o => o.MapFrom(s => s.Pacienti.Mbiemri))
            // // .ForMember(d => d.Email, o => o.MapFrom(s => s.Pacienti.Email));
            // CreateMap<PacientiXRay, XRayDto>()
            // .ForMember(d => d.Id, o => o.MapFrom(s => s.XRay.Id))
            // .ForMember(d => d.Data, o => o.MapFrom(s => s.XRay.Data));
            CreateMap<PacientiDoktori, PacientiDto>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Pacienti.Id))
            .ForMember(d => d.Emri, o => o.MapFrom(s => s.Pacienti.Emri))
            .ForMember(d => d.Mbiemri, o => o.MapFrom(s => s.Pacienti.Mbiemri))
            .ForMember(d => d.Email, o => o.MapFrom(s => s.Pacienti.Email));
            CreateMap<PacientiDoktori, DoktoriDto>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Doktori.Id))
            .ForMember(d => d.Emri, o => o.MapFrom(s => s.Doktori.Emri))
            .ForMember(d => d.Mbiemri, o => o.MapFrom(s => s.Doktori.Mbiemri))
            .ForMember(d => d.Email, o => o.MapFrom(s => s.Doktori.Email));
            CreateMap<PacientiDoktori, PacientiDoktoriDTO>()
            .ForMember(d => d.PacientiId, o => o.MapFrom(s => s.Pacienti.Id));
    





          

            
         
         
        }
    }
}