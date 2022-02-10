using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;

namespace API.Data
{
    public class LectureRepository : ILectureRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public LectureRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Lecture> AddLectureAsync(Lecture lecture)
        {
            return (await _context.Lectures.AddAsync(lecture)).Entity;
        }
    }
}