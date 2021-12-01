using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Drawing;
using System.Net;
using System.Text;

namespace API.Controllers
{
    public class PostController: BaseApiController
    {
        [HttpPost("add-post-photo")]
        public async Task<ActionResult<string>> AddPostPhoto(IFormFile upload)
        {
            try
            {
                FileInfo fileInfo = new FileInfo(upload.FileName);
                System.Console.WriteLine(upload.FileName);
                var folderDirectory = $"\\Photos\\PostPhotos";
                var path = Path.Combine("Photos\\PostPhotos", upload.FileName);

                var memoryStream = new MemoryStream();
                await upload.OpenReadStream().CopyToAsync(memoryStream);

                if (!Directory.Exists(folderDirectory))
                {
                    Directory.CreateDirectory(folderDirectory);
                }

                await using (var fs = new FileStream(path, FileMode.Create, FileAccess.Write))
                {
                    memoryStream.WriteTo(fs);
                }

                return Ok(new { Url = path });
            } 
            catch(Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        private byte[] String_To_Bytes2(string strInput)    
        {    
            int numBytes = (strInput.Length) / 2;    
            byte[] bytes = new byte[numBytes];    
            for (int x = 0; x < numBytes; ++x)    
            {    
                bytes[x] = Convert.ToByte(strInput.Substring(x * 2, 2), 16);    
            }    
            return bytes;    
        }  
    }
}