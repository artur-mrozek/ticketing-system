using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class QueryObject
    {
        public int PageNumber {get; set; } = 1;
        public int PageSize { get; set; } = 20;
        public string Status { get; set; } = "";
        [RegularExpression("L1|L2|L3", ErrorMessage = "Invalid line")]
        public string Line { get; set; } = "";
    }
}