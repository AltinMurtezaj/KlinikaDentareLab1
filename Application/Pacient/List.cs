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

namespace Application.Pacient
{
    public class List
    {
        public class Query : IRequest<Result<List<PacientiDto>>>{}

        public class Handler : IRequestHandler<Query, Result <List<PacientiDto>>>
        {

            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                    _context = context;
                    _mapper = mapper;
            }
            public async Task<Result<List<PacientiDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var pacientet = await _context.Pacientet.Include(x => x.Doktoret).ThenInclude(x => x.Doktori)
                                                            .Include(x => x.Tretmanet).Include(x=>x.Terminet)
                                                        .ToListAsync();
                var pacientetList = _mapper.Map<List<PacientiDto>>(pacientet);
                return Result<List<PacientiDto>>.Success(pacientetList);
            }
            
        }
    }
}