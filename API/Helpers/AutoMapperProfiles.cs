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

            CreateMap<Tutorial, UpsertTutorialDto>().ReverseMap();
            CreateMap<Post, UpsertPostDto>().ReverseMap();
            CreateMap<Meta, CreateMetaDto>().ReverseMap();
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Tag, TagDto>().ReverseMap();


            CreateMap<AppUser, UserDto>().ReverseMap();
            CreateMap<Post, PostDto>().ReverseMap();
            CreateMap<Meta, MetaDto>().ReverseMap();
            CreateMap<Tutorial, TutorialDto>().ReverseMap();

            CreateMap<Post, HomePagePostDto>().ReverseMap();
            CreateMap<Meta, HomePageMetaDto>() .ReverseMap();
            CreateMap<Tutorial, HomePageTutorialDto>().ReverseMap();

            CreateMap<Post, UpsertPostListDto>().ReverseMap();
            CreateMap<Post, UpsertPostOfLectureDto>().ReverseMap();
            CreateMap<Tutorial, UpsertTutorialListDto>().ReverseMap();

            CreateMap<Lecture, UpsertLectureDto>().ReverseMap();
            CreateMap<Section, UpserSectionDto>().ReverseMap();
            CreateMap<Course, UpsertCourseDto>().ReverseMap();

            CreateMap<Course, UpsertCourseListDto>().ReverseMap();
        }
    }
}