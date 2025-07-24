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
using CrumbCodeBackend.Models.Response;
using CrumbCodeBackend.DTO;
using CrumbCodeBackend.Mappers;

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
        public async Task<ApiResponse<double>> SumStorage()
        {
            var sizes = await _context.Medias.Select(m => m.SizeInBytes).ToListAsync();
            var data = await _context.Medias.SumAsync(m => m.SizeInBytes);
            
            return new ApiResponse<double>
            {
                Success = true,
                StatusCode = 200,
                Message = "ok",
                Data = data
            };
        }

        public async Task<ApiResponse<MediaDto>> CreateAsync(Media media, IFormFile? file)
        {
            if (file == null || media == null)
            {
                return new ApiResponse<MediaDto>
                {
                    Success = false,
                    StatusCode = 400,
                    Message = "file was null"
                };
            }

            using var transaction = await _context.Database.BeginTransactionAsync();
            var guid = Guid.NewGuid().ToString();
            try
            {
                var fileUrl = await _amazonS3Service.UploadFileAsync(file, guid);
                if (fileUrl == null)
                {
                    return new ApiResponse<MediaDto>
                    {
                        Success = false,
                        StatusCode = 400,
                        Message = "somehow file url is null"
                    };
                }

                var newMedia = new Media
                {
                    AltText = media.AltText,
                    Url = fileUrl,
                    ObjectKey = "crumbcode/" + guid + "." + fileUrl.Split(".").Last(),
                    UUID = guid,
                    ContentType = media.ContentType,
                    FileName = media.FileName,
                    SizeInBytes = media.SizeInBytes,
                    ShowInGallery = media.ShowInGallery,
                };

                await _context.Medias.AddAsync(newMedia);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                return new ApiResponse<MediaDto>
                {
                    Success = true,
                    StatusCode = 200,
                    Message = "ok",
                    Data = newMedia.FromModelToDTO()
                };
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                throw;
            }

        }

        public async Task<ApiResponse<List<Media>>> GetAll(MediaQueryObject queryObject)
        {
            var media = _context.Medias.AsQueryable();
            var skip = (queryObject.PageNumber - 1) * queryObject.PageSize;

            var res = await media
                .Skip(skip)
                .Take(queryObject.PageSize)
                .ToListAsync();
            var signedMedia = new List<Media>();

            foreach (var item in res)
            {
                var signedUrl = await _amazonS3Service.GetImageSignedUrl(item.ObjectKey);

                item.Url = signedUrl;
                signedMedia.Add(item);
            }

            var totalCount = await _context.Medias.CountAsync();

            return new ApiResponse<List<Media>>
            {
                Success = true,
                StatusCode = 200,
                Data = signedMedia,
                Meta = new MetaData
                {
                    TotalCount = totalCount,
                    PageNumber = queryObject.PageNumber,
                    PageSize = queryObject.PageSize
                }
            };

        }

        public async Task<ApiResponse<MediaDto>> UpdateAsync(string uuid, Media media, IFormFile? file)
        {
            var existingMedia = await _context.Medias.FirstOrDefaultAsync((m) => m.UUID == uuid);
            if (existingMedia == null)
            {
                return new ApiResponse<MediaDto>
                {
                    Success = false,
                    StatusCode = 400,
                    Message = "file was null"
                };
            }

            var newMediaObjectKey = Guid.NewGuid().ToString();
            var fileUrl = file != null ? await _amazonS3Service.UploadFileAsync(file, newMediaObjectKey) : existingMedia.Url;
            if (fileUrl == null)
            {
                return new ApiResponse<MediaDto>
                {
                    Success = false,
                    StatusCode = 400,
                    Message = "file url not provided"
                };
            }

            existingMedia.AltText = media.AltText;
            existingMedia.FileName = media.FileName;
            existingMedia.ShowInGallery = media.ShowInGallery;
            existingMedia.Url = fileUrl;
            existingMedia.ObjectKey = "crumbcode/" + newMediaObjectKey + "." + fileUrl.Split(".").Last();

            await _context.SaveChangesAsync();

            return new ApiResponse<MediaDto>
            {
                Success = true,
                StatusCode = 200,
                Message = "ok",
                Data = existingMedia.FromModelToDTO()
            };
        }
        public async Task<ApiResponse<MediaDto>> GetOne(string uuid)
        {
            var mediaQ = _context.Medias.AsQueryable();
            var media = await mediaQ.FirstOrDefaultAsync(m => m.UUID == uuid);
            
            if(media == null)
            {
                return new ApiResponse<MediaDto>
                {
                    Success = false,
                    StatusCode = 400,
                    Message = "file was null"
                };
            }

            var signedUrl = await _amazonS3Service.GetImageSignedUrl(media.ObjectKey);
            media.Url = signedUrl;

            return new ApiResponse<MediaDto>
            {
                Success = true,
                StatusCode = 200,
                Message = "ok",
                Data = media.FromModelToDTO()
            };
        }
        public async Task<Media?> Recycle(string uuid, string? token)
        {
            var media = await Exists(uuid);
            if(media == null)
            {
                return null;
            }
            
            await _context.SaveChangesAsync();
            return media;
        }
        public async Task<Media?> Delete(string uuid)
        {
            var media = await Exists(uuid);
            if(media == null)
            {
                return null;
            }

            _context.Medias.Remove(media);
            await _context.SaveChangesAsync();

            return media;
        }
        public Task<Media?> Exists(string uuid)
        {
            var media = _context.Medias.FirstOrDefaultAsync(c => c.UUID == uuid);
            return media;
        }
    }
}