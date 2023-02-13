using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Domain;
using AutoMapper;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using Microsoft.Extensions.Logging;
using Application.Core;

namespace Application.KontrollaFolder
{
    public class List
    {
        public class Query : IRequest<Result<List<KontrollaDto>>>{}

        public class Handler : IRequestHandler<Query, Result<List<KontrollaDto>>>
        {

            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                    _context = context;
                    _mapper = mapper;
            }
            public async Task<Result<List<KontrollaDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var kontrollat = await _context.Kontrollat                         
    
                                                        .Include(x => x.Tretmanet)
                                                        .ToListAsync();
                var kontrollatList = _mapper.Map<List<KontrollaDto>>(kontrollat);
                return Result<List<KontrollaDto>>.Success(kontrollatList);
            }
            
        }
    }
}