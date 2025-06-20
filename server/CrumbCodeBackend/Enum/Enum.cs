using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CrumbCodeBackend.Enum
{
    public class Enum
    {
        public enum MediaType
        {
            IMAGE,
            VIDEO
        }
        public enum CakeAllergens
        {
            [JsonPropertyName("SOY")]
            SOY,
            [JsonPropertyName("GLUTEN")]
            GLUTEN,

            [JsonPropertyName("EGGS")]
            EGGS,
            [JsonPropertyName("NUTS")]
            NUTS,
            [JsonPropertyName("DAIRY")]
            DAIRY,
            [JsonPropertyName("NONE")]
            NONE
        }
    }
}