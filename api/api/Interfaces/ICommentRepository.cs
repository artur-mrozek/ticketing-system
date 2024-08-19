using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface ICommentRepository
    {
        public Task<Comment> Create(Comment comment);
        public Task<Comment?> GetById(int id);
    }
}