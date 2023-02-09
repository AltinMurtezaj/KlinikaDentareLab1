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

namespace Application.LaborPerson
{
    public class List
    {
        public class Query : IRequest<Result<List<LaborantiDto>>>{}

        public class Handler : IRequestHandler<Query, Result <List<LaborantiDto>>>
        {

            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                    _context = context;
                    _mapper = mapper;
            }
            public async Task<Result<List<LaborantiDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var laborantet = await _context.Laborantet.Include(x => x.Laboratori)
                                                        .ToListAsync();
                var laborantetList = _mapper.Map<List<LaborantiDto>>(laborantet);
                return Result<List<LaborantiDto>>.Success(laborantetList);
            }
            
        }
    }
}