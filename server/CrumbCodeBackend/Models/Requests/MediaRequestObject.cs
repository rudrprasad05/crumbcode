using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CrumbCodeBackend.Models.Requests
{
    public class EditMediaRequest
    {
        public string AltText { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
    }
    public class NewMediaRequest(string url, string altText, string fileName, string contentType, IFormFile file)
    {
        public string Url { get; set; } = url;
        public string AltText { get; set; } = altText;
        public string FileName { get; set; } = fileName;
        public string ContentType { get; set; } = contentType;
        public long SizeInBytes { get; set; } = file.Length;
        public IFormFile File { get; set; } = file;
    }
}