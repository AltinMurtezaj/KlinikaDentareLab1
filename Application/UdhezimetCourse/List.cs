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

namespace Application.UdhezimetCourse
{
    public class List
    {
        public class Query : IRequest<Result<List<UdhezimiDto>>>{}

        public class Handler : IRequestHandler<Query, Result<List<UdhezimiDto>>>
        {

            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                    _context = context;
                    _mapper = mapper;
            }
            public async Task<Result<List<UdhezimiDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var udhezimi = await _context.Udhezimet.Include(x => x.Tretmani)
                                                        .ToListAsync();
                var udhezimetList = _mapper.Map<List<UdhezimiDto>>(udhezimi);
                return Result<List<UdhezimiDto>>.Success(udhezimetList);
            }
        }
    }
}