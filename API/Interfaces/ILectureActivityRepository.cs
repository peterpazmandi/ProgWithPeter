using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface ILectureActivityRepository
    {
        Task SetLectureCompletion(Lecture lecture, AppUser user, bool isCompleted);
    }
}