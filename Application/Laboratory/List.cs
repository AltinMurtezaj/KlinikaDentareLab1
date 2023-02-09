using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using Microsoft.Extensions.Logging;
using AutoMapper;
using Application.Core;

namespace Application.Laboratory
{
    public class List
    {
        public class Query : IRequest<Result<List<LaboratoriDto>>>{}

        public class Handler : IRequestHandler<Query, Result<List<LaboratoriDto>>>
        {

            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                    _context = context;
                    _mapper = mapper;
            }
            public async Task<Result<List<LaboratoriDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var laboratoret = await _context.Laboratori.Include(x => x.Laboranti)
                                                        .ToListAsync();
                var laboratoretList = _mapper.Map<List<LaboratoriDto>>(laboratoret);
                return Result<List<LaboratoriDto>>.Success(laboratoretList);
            }
            
        }
    }
}