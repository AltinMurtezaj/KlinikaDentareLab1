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

namespace Application.TerminiFolder
{
    public class List
    {
        public class Query : IRequest<Result<List<TerminiDto>>>{}

        public class Handler : IRequestHandler<Query, Result<List<TerminiDto>>>
        {

            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                    _context = context;
                    _mapper = mapper;
            }
            public async Task<Result<List<TerminiDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var terminet = await _context.Terminet.Include(x => x.Kontrollat).ToListAsync();
                var terminetList = _mapper.Map<List<TerminiDto>>(terminet);
                return Result<List<TerminiDto>>.Success(terminetList);
            }
            
        }
    }
}