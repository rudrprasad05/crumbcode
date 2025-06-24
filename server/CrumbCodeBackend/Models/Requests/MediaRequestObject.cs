using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrumbCodeBackend.Models.Requests
{
    public class EditMediaRequest
    {
        public string AltText { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
    }
    public class NewMediaRequest
    {
        public string Url { get; set; } = string.Empty;
        public string AltText { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public string ContentType { get; set; } = string.Empty;
        public long SizeInBytes { get; set; }
        public IFormFile File { get; set; } = null!;
    }
}