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

namespace Application.XRayFolder
{
    public class List
    {
        public class Query : IRequest<Result<List<XRayDto>>>{}

        public class Handler : IRequestHandler<Query, Result <List<XRayDto>>>
        {

            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                    _context = context;
                    _mapper = mapper;
            }
            public async Task<Result<List<XRayDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var xray = await _context.XRays.Include(x=>x.Pacienti).ToListAsync();
                var xrayList = _mapper.Map<List<XRayDto>>(xray);
                return Result<List<XRayDto>>.Success(xrayList);
            }
            
        }
    }
}