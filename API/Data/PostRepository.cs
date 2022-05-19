using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PostRepository : IPostRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public PostRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void Remove(Post post)
        {
            _context.Posts.Remove(post);
        }

        public async Task<Post> GetPostByIdAsnyc(int postId)
        {
            return await _context.Posts.FirstOrDefaultAsync(p => p.Id == postId);
        }
    }
}