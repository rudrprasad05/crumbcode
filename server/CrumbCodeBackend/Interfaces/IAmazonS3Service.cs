using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3.Model;

namespace CrumbCodeBackend.Interfaces
{
    public interface IAmazonS3Service
    {
        Task<string?> UploadFileAsync(IFormFile file);
        public Task<GetObjectResponse?> GetObjectAsync(string fileName);
        public Task<bool> DeleteFileAsync(string fileName);
        
    }
}