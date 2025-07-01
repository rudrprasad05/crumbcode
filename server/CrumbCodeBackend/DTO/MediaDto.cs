using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrumbCodeBackend.DTO
{
    public class MediaDto
    {

        public string SignedUrl { get; set; } = string.Empty;
        public string ObjectKey { get; set; } = string.Empty;
        public string AltText { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public string ContentType { get; set; } = string.Empty;
        public long SizeInBytes { get; set; }

    }
}