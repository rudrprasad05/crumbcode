using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrumbCodeBackend.Controllers;
using CrumbCodeBackend.Interfaces;
using CrumbCodeBackend.Models;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;


namespace CrumbCodeBackend.Controllers
{
    [Route("/cake")]
    [ApiController]
    public class CakeController : BaseController
    {
        private readonly ICakeRepository _cakeRepository;
        private readonly IAntiforgery _antiforgery;

        public CakeController(ICakeRepository cakeRepository, IAntiforgery antiforgery)
        {
            _cakeRepository = cakeRepository;
            _antiforgery = antiforgery;
        }

        // [HttpPost("create")]
        // public Task<Cake> CreateAsync()
        // {
            
        // }

    }
}