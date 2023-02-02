using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.UdhezimetCourse
{
    public class UdhezimiDto
    {
        public int Id { get; set; }
        public string Emri { get; set; }
        public string Doza { get; set; }
        public int TretmaniId { get; set; }
    }
}