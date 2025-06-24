using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using CrumbCodeBackend.Interfaces;
using CrumbCodeBackend.Data;
using CrumbCodeBackend.Models;
using CrumbCodeBackend.Models.Requests;

namespace CrumbCodeBackend.Repository
{
    public class MediaRepository : IMediaRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IAmazonS3Service _amazonS3Service;


        public MediaRepository(ApplicationDbContext context, IAmazonS3Service amazonS3Service)
        {
            _context = context;
            _amazonS3Service = amazonS3Service;
        }
        public async Task<double> SumStorage(string userId)
        {
            return 0;
            // return await _context.Medias.SumAsync();
        }

        public async Task<Media?> CreateAsync(IFormFile file, string folderId)
        {
            if (file == null || folderId == null)
            {
                return null;
            }

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var fileUrl = await _amazonS3Service.UploadFileAsync(file);
                if(fileUrl == null)
                {
                    return null;
                }

                // Create Media
                var media = new Media
                {
                    AltText = "",
                    Url = "",
                    ContentType = "",
                    FileName = "",
                    SizeInBytes = 0
                };

                await _context.Medias.AddAsync(media);
                await _context.SaveChangesAsync();

                // Commit transaction
                await transaction.CommitAsync();

                return media;
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                throw;
            }

        }

        public async Task<List<Media>?> GetAll(MediaQueryObject queryObject, string? userId)
        {
            if(string.IsNullOrEmpty(userId))
            {
                return null;
            }

            var media = _context.Medias.AsQueryable();
            

            var res = await media.ToListAsync();
            return res; 
        }

        public async Task<Media?> MoveMedia(int id, string moveId, string? token)
        {
            var folder = await _context.Medias.FirstOrDefaultAsync((i) => i.Id == id);
            if(folder == null)
            {
                return null;
            }

            await _context.SaveChangesAsync();
            return folder;
        }

        public async Task<Media?> Rename(int id, string name, string? token)
        {
            var media = await _context.Medias.FirstOrDefaultAsync((m) => m.Id == id);
            if(media == null)
            {
                return null;
            }

            await _context.SaveChangesAsync();
            return media;
        }
        public async Task<Media?> Star(int id, bool star, string? token)
        {
            var media = await _context.Medias.FirstOrDefaultAsync((m) => m.Id == id);
            if(media == null)
            {
                return null;
            }

            await _context.SaveChangesAsync();
            return media;
        }

        public async Task<Media?> GetOne(int id, string? token)
        {
            var mediaQ = _context.Medias.AsQueryable();
            var media = mediaQ.FirstOrDefaultAsync(m => m.Id == id);
            
            if(media == null)
            {
                return null;
            }

            return await media;
        }

        public async Task<Media?> Recycle(int id, string? token)
        {
            var media = await GetOne(id, token);
            if(media == null)
            {
                return null;
            }
            
            await _context.SaveChangesAsync();
            return media;
        }

        public async Task<Media?> Delete(int id, string? token)
        {
            var media = await GetOne(id, token);
            if(media == null)
            {
                return null;
            }

            _context.Medias.Remove(media);
            await _context.SaveChangesAsync();

            return media;
        }

    }
}