using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Comment
{
    public class CommentCreateRequestDto
    {
        public string Content { get; set; } = null!;
    }
}