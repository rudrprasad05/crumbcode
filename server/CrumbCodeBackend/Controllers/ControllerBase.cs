using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.Middleware;
using Microsoft.AspNetCore.Mvc;

namespace CrumbCodeBackend.Controllers
{
    [Route("/api")]
    public class BaseController : ControllerBase
    {
        protected async Task WriteLog(string message)
        {
            await Log.Write(message);
        }
    }
}