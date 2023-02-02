using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using AutoMapper;
using MediatR;
using System.Threading;
using Persistence;

namespace Application.TretmaniCourse
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Tretmani Tretmani { get; set; }
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
                var tretmani = await _context.Tretmanet.FindAsync(request.Tretmani.Id);

                _mapper.Map(request.Tretmani, tretmani);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }

        }
    }
}