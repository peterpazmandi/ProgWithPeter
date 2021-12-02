using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class TutorialController: PostController
    {
        [HttpPost]
        public async Task<ActionResult> CreateTutorial(CreateTutorialDto tutorial)
        {
            


            return Ok();
        }
    }
}