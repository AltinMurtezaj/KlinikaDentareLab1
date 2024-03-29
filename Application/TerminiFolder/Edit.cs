using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using AutoMapper;
using MediatR;
using System.Threading;
using Persistence;

namespace Application.TerminiFolder
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Termini Termini { get; set; }
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
                var termini = await _context.Terminet.FindAsync(request.Termini.Id);

                _mapper.Map(request.Termini, termini);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }

        }
    }
}