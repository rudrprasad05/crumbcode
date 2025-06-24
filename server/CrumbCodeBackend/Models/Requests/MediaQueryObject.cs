using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrumbCodeBackend.Models.Requests
{
    public class MediaQueryObject
    {
        public bool? IsStarred { get; set; } = null;
        public bool? IsDeleted { get; set; } = false;
    }
}