using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.PacientiDoktoriConnection
{
    public class ListByDoktori
    {
        public class Query : IRequest<Result<List<PacientiDoktori>>> 
        { 
            public string DoktoriId{get;set;}
        }

        public class Handler : IRequestHandler<Query, Result<List<PacientiDoktori>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<PacientiDoktori>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var pacientet = await _context.PacientiDoktoret.Include(u => u.Pacienti)
                .Where(x=>x.DoktoriId==request.DoktoriId).ToListAsync();
                var pacientetToReturn = _mapper.Map<List<PacientiDoktori>>(pacientet);
                return Result<List<PacientiDoktori>>.Success(pacientetToReturn);
            }
        }
    }
}