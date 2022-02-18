using System.Collections.Generic;
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterDto, AppUser>();
            CreateMap<Photo, PhotoDto>();
            CreateMap<AppUser, MemberDto>();

            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Tag, TagDto>().ReverseMap();

            CreateMap<AppUser, UserDto>().ReverseMap();

            CreateMap<Meta, MetaDto>().ReverseMap();
            CreateMap<Meta, CreateMetaDto>().ReverseMap();
            CreateMap<Meta, HomePageMetaDto>() .ReverseMap();

            CreateMap<Tutorial, UpsertTutorialDto>().ReverseMap();
            CreateMap<Tutorial, TutorialDto>().ReverseMap();
            CreateMap<Tutorial, HomePageTutorialDto>().ReverseMap();
            CreateMap<Tutorial, UpsertTutorialListDto>().ReverseMap();

            CreateMap<Post, UpsertPostDto>().ReverseMap();
            CreateMap<Post, UpsertPostListDto>().ReverseMap();
            CreateMap<Post, HomePagePostDto>().ReverseMap();
            CreateMap<Post, PostTitleDto>().ReverseMap();
            CreateMap<Post, PostDto>().ReverseMap();
            CreateMap<Post, UpsertPostOfLectureDto>().ReverseMap();            

            CreateMap<Lecture, LectureDto>().ReverseMap();
            CreateMap<Lecture, UpsertLectureDto>().ReverseMap();
            CreateMap<Lecture, LectureTitleDto>().ReverseMap();

            CreateMap<Section, SectionDto>().ReverseMap();
            CreateMap<Section, UpserSectionDto>().ReverseMap();

            CreateMap<Course, CourseDto>().ReverseMap();
            CreateMap<Course, UpsertCourseDto>().ReverseMap();
            CreateMap<Course, UpsertCourseListDto>().ReverseMap();
        }
    }
}