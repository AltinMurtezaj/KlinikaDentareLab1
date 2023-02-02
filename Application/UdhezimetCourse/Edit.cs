using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using AutoMapper;
using MediatR;
using System.Threading;
using Persistence;

namespace Application.UdhezimetCourse
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Udhezimi Udhezimi { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var udhezimi = await _context.Udhezimet.FindAsync(request.Udhezimi.Id);

                _mapper.Map(request.Udhezimi, udhezimi);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }

        }
    }
}