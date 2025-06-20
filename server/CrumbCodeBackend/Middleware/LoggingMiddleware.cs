using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrumbCodeBackend.Middleware
{
    public class Log
    {
        private readonly RequestDelegate _next;
        private readonly string _logDirectory = "logs";

        public Log(RequestDelegate next)
        {
            _next = next;

            // Ensure the logs directory exists
            if (!Directory.Exists(_logDirectory))
            {
                Directory.CreateDirectory(_logDirectory);
            }
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var logFilePath = Path.Combine(_logDirectory, $"{DateTime.Now:yyyy-MM-dd}.log");

            // Log request details
            var logMessage = $"[{DateTime.Now:HH:mm:ss}] {context.Request.Method} {context.Request.Path} {context.Request.QueryString}\n";
            await File.AppendAllTextAsync(logFilePath, logMessage);

            // Call the next middleware in the pipeline
            await _next(context);
        }

        public static async Task Write(string message)
        {
            var logDirectory = "logs";
            var logFilePath = Path.Combine(logDirectory, $"{DateTime.Now:yyyy-MM-dd}.log");

            if (!Directory.Exists(logDirectory))
            {
                Directory.CreateDirectory(logDirectory);
            }

            var logMessage = $"[{DateTime.Now:HH:mm:ss}] {message}\n";
            await File.AppendAllTextAsync(logFilePath, logMessage);
        }
    }
}