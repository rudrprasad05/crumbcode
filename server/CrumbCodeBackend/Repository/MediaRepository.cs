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
        private readonly INotificationService _notificationService;
        private readonly IMediaMapper _mediaMapper;


        public MediaRepository(INotificationService notificationService, ApplicationDbContext context, IAmazonS3Service amazonS3Service)
        {
            _context = context;
            _amazonS3Service = amazonS3Service;
            _notificationService = notificationService;

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
            if (file == null || media == null) return ApiResponse<MediaDto>.Fail(message: "media null");

            using var transaction = await _context.Database.BeginTransactionAsync();

            var guid = Guid.NewGuid();
            var fileExtension = Path.GetExtension(file.FileName);

            try
            {
                var fileUrl = await _amazonS3Service.UploadFileAsync(file);
                using var stream = file.OpenReadStream();

                if (string.IsNullOrWhiteSpace(fileUrl))
                {
                    return ApiResponse<MediaDto>.Fail(message: "S3 upload failed");
                }

                var newMedia = new Media
                {
                    AltText = media.AltText,
                    ObjectKey = fileUrl,
                    UUID = guid.ToString(),
                    ContentType = media.ContentType,
                    FileName = media.FileName,
                    SizeInBytes = media.SizeInBytes,
                    ShowInGallery = media.ShowInGallery,
                };

                if (newMedia == null)
                {
                    return ApiResponse<MediaDto>.Fail();
                }

                await _context.Medias.AddAsync(newMedia);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                // var dto = await _mediaMapper.ToDtoAsync(newMedia);

                return ApiResponse<MediaDto>.Ok(data: new MediaDto());
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                throw;
            }

        }

        public async Task<ApiResponse<List<Media>>> GetAll(CakeQueryObject queryObject)
        {
            var media = _context.Medias.AsQueryable();
            if (queryObject.IsDeleted.HasValue)
            {
                media = media.Where(m => m.IsDeleted == queryObject.IsDeleted.Value);
            }

            if (queryObject.ShowInGallery.HasValue)
            {
                media = media.Where(m => m.ShowInGallery == queryObject.ShowInGallery.Value);
            }

            media = queryObject.SortBy switch
            {
                ESortBy.ASC => media.OrderBy(c => c.CreatedOn),
                ESortBy.DSC => media.OrderByDescending(c => c.CreatedOn),
                _ => media.OrderByDescending(c => c.CreatedOn)
            };

            var totalCount = await media.CountAsync();
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
            ;

            if (file != null)
            {
                var newMediaObjectKey = Guid.NewGuid().ToString();
                var fileUrl = await _amazonS3Service.UploadFileAsync(file);
                if (fileUrl == null)
                {
                    return new ApiResponse<MediaDto>
                    {
                        Success = false,
                        StatusCode = 400,
                        Message = "file url not provided"
                    };
                }

                existingMedia.Url = fileUrl;
                existingMedia.ObjectKey = "crumbcode/" + newMediaObjectKey + "." + fileUrl.Split(".").Last();
            }

            existingMedia.AltText = media.AltText;
            existingMedia.FileName = media.FileName;
            existingMedia.ShowInGallery = media.ShowInGallery;

            await _context.SaveChangesAsync();
            await _notificationService.CreateNotificationAsync(
                title: "Media Updated",
                message: "The media " + existingMedia.FileName + " was updated",
                type: NotificationType.SUCCESS,
                actionUrl: "/admin/bin?type=media&uuid=" + existingMedia.UUID
            );

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

            if (media == null)
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
        public async Task<ApiResponse<MediaDto>> SafeDelete(string uuid)
        {
            var media = await Exists(uuid);
            if (media == null)
            {
                return new ApiResponse<MediaDto>
                {
                    Success = false,
                    StatusCode = 400,
                    Message = "media was null"
                };
            }
            media.IsDeleted = true;

            await _context.SaveChangesAsync();
            await _notificationService.CreateNotificationAsync(
                title: "Media Deleted",
                message: "The media " + media.FileName + " was deleted",
                type: NotificationType.WARNING,
                actionUrl: "/admin/bin?type=media&uuid=" + media.UUID
            );

            return new ApiResponse<MediaDto>
            {
                Success = true,
                StatusCode = 200,
                Data = media.FromModelToDTO()
            };
        }

        public Task<Media?> Exists(string uuid)
        {
            var media = _context.Medias.FirstOrDefaultAsync(c => c.UUID == uuid);
            return media;
        }
    }
}