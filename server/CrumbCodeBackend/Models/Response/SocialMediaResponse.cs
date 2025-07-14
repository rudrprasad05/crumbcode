using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrumbCodeBackend.Models.Response
{
    public class SocialMediaResponse
    {
        public class CreateSocialMediaResponse
        {
            public CreateSocialMediaResponse() { }

            public SocialMedia Cake { get; set; } = null!;
            public int TotalLength { get; set; } = 0;
        }
        public class GetAllSocialMediaReponse
        {
            public GetAllSocialMediaReponse(){}

            public List<SocialMedia> SocialMedias { get; set; } = [];
            public int TotalLength { get; set; } = 0;
        }
    }
}