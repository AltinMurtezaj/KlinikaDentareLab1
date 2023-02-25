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
using Application.Core;
using AutoMapper;

namespace Application.Doctor
{
    public class List
    {
        public class Query : IRequest<Result<List<DoktoriDto>>>{}

        public class Handler : IRequestHandler<Query, Result<List<DoktoriDto>>>
        {

            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                    _context = context;
                    _mapper = mapper;
            }
            public async Task<Result<List<DoktoriDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var doktoret = await _context.Doktoret.Include(x => x.Pacientet).ThenInclude(x => x.Pacienti)
                                                        .Include(x => x.Terminet)
                                                        .Include(x => x.Tretmanet)
                                                        .ToListAsync();
                                                         
                var doktoretList = _mapper.Map<List<DoktoriDto>>(doktoret);
                return Result<List<DoktoriDto>>.Success(doktoretList);
            }
            
        }
    }
}