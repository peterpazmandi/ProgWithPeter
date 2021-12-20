using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TutorialController: PostController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public TutorialController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("GetPublishedTutorialsOrderedByPublishDate")]
        public async Task<ActionResult<IEnumerable<TutorialDto>>> GetPublishedTutorialsOrderedByPublishDate([FromQuery] TutorialParams tutorialParams)
        {
            var tutorials = await _unitOfWork.TutorialRepository.GetPublishedTutorialsOrderedByPublishDate(tutorialParams);

            Response.AddPaginationHeader(tutorials.CurrentPage, tutorials.PageSize, tutorials.TotalCount, tutorials.TotalPages);

            return tutorials;
        }

        [HttpPost]
        public async Task<ActionResult> CreateTutorial(UpsertTutorialDto tutorialDto)
        {
            if(tutorialDto.Id == 0)
            {
                if((await _unitOfWork.TutorialRepository.GetTutorialByTitleAsync(tutorialDto.Post.Title)) != null)
                {
                    return BadRequest("A tutorial with this title already exists!");
                }
            }

            // Get author
            string username = User.GetUsername();
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

            // Get category
            var category = await _unitOfWork.CategoriesRepository.GetCategoryByNameAsync(tutorialDto.Post.Category);

            // Get tags
            ICollection<Tag> tags = new HashSet<Tag>();
            foreach(int tagId in tutorialDto.Post.Tags)
            {
                tags.Add(await _unitOfWork.TagsRepository.GetTagByIdAsync(tagId));
            }

            var tutorial = new Tutorial();

            if(tutorialDto.Id == 0)
            {
                if(tutorialDto.Status.Equals(PostStatus.Published.ToString())) {
                    tutorial.PublishDate = DateTime.Now;
                }

                tutorial = new Tutorial
                {
                    Id = tutorialDto.Id,
                    CreationDate = DateTime.Now,
                    ModificationDate = DateTime.Now,
                    Post = new Post
                    {
                        Title = tutorialDto.Post.Title,
                        Excerpt = tutorialDto.Post.Excerpt,
                        Content = tutorialDto.Post.Content,
                        FeaturedImageUrl = tutorialDto.Post.FeaturedImageUrl,
                        Password = tutorialDto.Post.Password,
                        AppUser = user,
                        Category = category,
                        Tags = tags,
                        Meta = _mapper.Map<Meta>(tutorialDto.Post.Meta)
                    },
                    Status = tutorialDto.Status,
                    Price = tutorialDto.Price,
                    Currency = tutorialDto.Currency
                };

                await _unitOfWork.TutorialRepository.AddTutorialAsync(tutorial);
            }
            else
            {
                // Update existing tutorial
                tutorial = await _unitOfWork.TutorialRepository.GetTutorialById(tutorialDto.Id);

                tutorial.Post.Title = tutorialDto.Post.Title;
                tutorial.Post.Excerpt = tutorialDto.Post.Excerpt;
                tutorial.Post.Content = tutorialDto.Post.Content;
                tutorial.Post.Password = tutorialDto.Post.Password;
                tutorial.Post.AppUser = user;
                tutorial.ModificationDate = DateTime.Now;

                if(tutorialDto.Status.Equals(PostStatus.Published.ToString())) {
                    tutorial.PublishDate = DateTime.Now;
                }

                tutorial.Post.AppUser = user;

                tutorial.Post.Category = category;

                tutorial.Post.Tags = tags;

                tutorial.Post.Meta.KeyPhrase = tutorialDto.Post.Meta.KeyPhrase;
                tutorial.Post.Meta.SeoTitle = tutorialDto.Post.Meta.SeoTitle;
                tutorial.Post.Meta.Slug = tutorialDto.Post.Meta.Slug;
                tutorial.Post.Meta.MetaDescription = tutorialDto.Post.Meta.MetaDescription;

                tutorial.Status = tutorialDto.Status;
                tutorial.Price = tutorialDto.Price;
                tutorial.Currency = tutorialDto.Currency;
            }

            if(await _unitOfWork.Complete())
            {
                return Ok(new {
                    tutorialId = tutorial.Id,
                    message = "Tutorial has been created successfully!"
                });
            }

            return BadRequest("Failed to create tutorial!");
        }
    }
}