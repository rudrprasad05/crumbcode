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
        public async Task<double> SumStorage()
        {
            var sizes = await _context.Medias.Select(m => m.SizeInBytes).ToListAsync();
            Console.WriteLine("Sizes: " + string.Join(", ", sizes));
            return await _context.Medias.SumAsync(m => m.SizeInBytes);
        }

        public async Task<Media?> CreateAsync(NewMediaRequest newMediaObject)
        {
            if (newMediaObject.File == null || newMediaObject == null)
            {
                return null;
            }

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var fileUrl = await _amazonS3Service.UploadFileAsync(newMediaObject.File);
                if(fileUrl == null)
                {
                    return null;
                }

                // Create Media
                var media = new Media
                {
                    AltText = newMediaObject.AltText,
                    Url = fileUrl,
                    ContentType = newMediaObject.ContentType,
                    FileName = newMediaObject.FileName,
                    SizeInBytes = newMediaObject.SizeInBytes
                };

                await _context.Medias.AddAsync(media);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                return media;
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                throw;
            }

        }

        public async Task<List<Media>?> GetAll(MediaQueryObject queryObject)
        {
            var media = _context.Medias.AsQueryable();

            // if(queryObject.IsStarred.HasValue)
            // {
            //     media = media.Where(s => s.Star.Equals(queryObject.IsStarred));
            // }
            

            var res = await media.ToListAsync();
            return res; 
        }

        public async Task<Media?> MoveMedia(string uuid, string moveId, string? token)
        {
            var folder = await _context.Medias.FirstOrDefaultAsync((i) => i.UUID == uuid);
            if(folder == null)
            {
                return null;
            }

            await _context.SaveChangesAsync();
            return folder;
        }

        public async Task<Media?> Edit(string uuid, EditMediaRequest request)
        {
            var media = await _context.Medias.FirstOrDefaultAsync((m) => m.UUID == uuid);
            if(media == null)
            {
                return null;
            }

            media.AltText = request.AltText;
            media.FileName = request.FileName;

            await _context.SaveChangesAsync();
            return media;
        }
        public async Task<Media?> Star(string uuid, bool star, string? token)
        {
            var media = await _context.Medias.FirstOrDefaultAsync((m) => m.UUID == uuid);
            if(media == null)
            {
                return null;
            }

            await _context.SaveChangesAsync();
            return media;
        }

        public async Task<Media?> GetOne(string uuid)
        {
            var mediaQ = _context.Medias.AsQueryable();
            var media = mediaQ.FirstOrDefaultAsync(m => m.UUID == uuid);
            
            if(media == null)
            {
                return null;
            }

            return await media;
        }

        public async Task<Media?> Recycle(string uuid, string? token)
        {
            var media = await GetOne(uuid);
            if(media == null)
            {
                return null;
            }
            
            await _context.SaveChangesAsync();
            return media;
        }

        public async Task<Media?> Delete(string uuid)
        {
            var media = await GetOne(uuid);
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