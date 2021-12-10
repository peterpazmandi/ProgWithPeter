using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
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
        public async Task<ActionResult<IEnumerable<TutorialDto>>> GetPublishedTutorialsOrderedByPublishDate()
        {
            IEnumerable<Tutorial> tutorialEntity = await _unitOfWork.TutorialRepository.GetPublishedTutorialsOrderedByPublishDate();

            return Ok(_mapper.Map<IEnumerable<TutorialDto>>(tutorialEntity));
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

            if(tutorialDto.Id == 0)
            {
                // Create new tutorial
                var tutorial = new Tutorial
                {
                    Id = tutorialDto.Id,
                    CreationDate = DateTime.Now,
                    ModificationDate = DateTime.Now,
                    Post = new Post
                    {
                        Title = tutorialDto.Post.Title,
                        Excerpt = tutorialDto.Post.Excerpt,
                        Content = tutorialDto.Post.Content,
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
                var tutorialToUpdate = await _unitOfWork.TutorialRepository.GetTutorialById(tutorialDto.Id);

                tutorialToUpdate.Post.Title = tutorialDto.Post.Title;
                tutorialToUpdate.Post.Excerpt = tutorialDto.Post.Excerpt;
                tutorialToUpdate.Post.Content = tutorialDto.Post.Content;
                tutorialToUpdate.Post.Password = tutorialDto.Post.Password;
                tutorialToUpdate.Post.AppUser = user;
                tutorialToUpdate.ModificationDate = DateTime.Now;

                tutorialToUpdate.Post.AppUser = user;

                tutorialToUpdate.Post.Category = category;

                tutorialToUpdate.Post.Tags = tags;

                tutorialToUpdate.Post.Meta.KeyPhrase = tutorialDto.Post.Meta.KeyPhrase;
                tutorialToUpdate.Post.Meta.SeoTitle = tutorialDto.Post.Meta.SeoTitle;
                tutorialToUpdate.Post.Meta.Slug = tutorialDto.Post.Meta.Slug;
                tutorialToUpdate.Post.Meta.MetaDescription = tutorialDto.Post.Meta.MetaDescription;

                tutorialToUpdate.Status = tutorialDto.Status;
                tutorialToUpdate.Price = tutorialDto.Price;
                tutorialToUpdate.Currency = tutorialDto.Currency;
            }

            if(await _unitOfWork.Complete())
            {
                return Ok(new {
                    message = "Tutorial has been created successfully!"
                });
            }

            return BadRequest("Failed to create tutorial!");
        }
    }
}