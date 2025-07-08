using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrumbCodeBackend.Models.Response
{
    public class ApiResponse<T>
    {
        public ApiResponse() { }
        public bool Success { get; set; }                     // True/false operation flag
        public int StatusCode { get; set; }                   // HTTP status code
        public string? Message { get; set; }                  // Human-readable message
        public T? Data { get; set; }                          // Actual data payload
        public MetaData? Meta { get; set; }                     // Extra metadata (pagination, etc.)
        public List<string>? Errors { get; set; }             // For validation or server-side errors
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }

    public class MetaData
    {
        public MetaData() { }
        public int PageSize { get; set; } = 0;
        public int TotalCount { get; set; } = 0;
        public int PageNumber { get; set; } = 0;
    
    }
}