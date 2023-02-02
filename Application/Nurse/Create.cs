using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;


namespace Application.Nurse
{
    public class Create
    {
        public class Command: IRequest<Result<Unit>>
        {
            public Infermierja Infermierja { get; set; }
     }

       

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {

            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Infermjeret.Add(request.Infermierja);

                var result = await _context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to create infermierja");
                return Result<Unit>.Success(Unit.Value);
            }

        }
    }
}