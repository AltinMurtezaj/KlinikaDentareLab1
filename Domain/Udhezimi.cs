using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace Domain
{
    public class Udhezimi
    {
        public int Id { get; set; }
        public string Emri { get; set; }
        public string Doza { get; set; }
        public int TretmaniId { get; set; }
        public Tretmani Tretmani { get; set; }
    
    }
}