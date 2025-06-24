using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrumbCodeBackend.Models.Response
{
    public class GetOnlyMediaRes
    {
        public int Id { get; set; }
        public string UUID { get; set; } = Guid.NewGuid().ToString();
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public DateTime UpdatedOn {get; set;} = DateTime.Now;
        public string Url { get; set; } = string.Empty;
        public string AltText { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public string ContentType { get; set; } = string.Empty;
        public long SizeInBytes { get; set; }
    }
}