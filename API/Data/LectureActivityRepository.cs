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
    public class LectureActivityRepository: ILectureActivityRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public LectureActivityRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task SetLectureCompletion(Lecture lecture, AppUser user, bool isCompleted)
        {
            var lectureActivity = await _context.LectureActivities.SingleOrDefaultAsync(
                    le => le.Lecture.Id == lecture.Id 
                    && le.AppUser.Id == user.Id);
            
            if(lectureActivity != null)
            {
                lectureActivity.IsCompleted = isCompleted;
            }
            else
            {
                lectureActivity = new LectureActivity()
                {
                    AppUser = user,
                    Lecture = lecture,
                    IsCompleted = isCompleted
                };

                await _context.LectureActivities.AddAsync(lectureActivity);
            }

            if(isCompleted)
            {
                lectureActivity.DateOfCompletion = DateTime.Now;
            }
            else
            {
                lectureActivity.DateOfCompletion = null;
            }
        }
    }
}