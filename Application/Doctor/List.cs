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
        public class Query : IRequest<Result<List<Doktori>>>{}

        public class Handler : IRequestHandler<Query, Result<List<Doktori>>>
        {

            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                    _context = context;
            }
            public async Task<Result<List<Doktori>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var doktori = await _context.Doktoret.ToListAsync();
                return Result<List<Doktori>>.Success(doktori);
            }
            
        }
    }
}