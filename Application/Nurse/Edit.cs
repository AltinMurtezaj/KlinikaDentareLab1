using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using AutoMapper;
using MediatR;
using System.Threading;
using Persistence;
using FluentValidation;
using Application.Core;

namespace Application.Nurse
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Infermierja Infermierja { get; set; }
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
                var infermierja = await _context.Infermjeret.FindAsync(request.Infermierja.Id);
                
                _mapper.Map(request.Infermierja, infermierja);
                
                await _context.SaveChangesAsync();

                return Unit.Value;
            }

        }
    }
}