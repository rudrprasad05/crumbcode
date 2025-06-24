"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, File } from "lucide-react";
import { Media } from "@/types";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (item: Partial<Media>) => void;
}

export function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    alt: "",
    caption: "",
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setFormData((prev) => ({
      ...prev,
      name: prev.name || file.name,
    }));
  };

  const getFileType = (file: File): Media["contentType"] => {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    return "document";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) return;

    // In a real app, you would upload the file to your storage service here
    // For demo purposes, we'll create a mock URL
    const mockUrl = URL.createObjectURL(selectedFile);

    const mediaItem: Partial<Media> = {
      fileName: formData.name || selectedFile.name,
      url: mockUrl,
      contentType: getFileType(selectedFile),
      sizeInBytes: selectedFile.size,
      altText: formData.alt,
    };

    onUpload(mediaItem);
    handleClose();
  };

  const handleClose = () => {
    setSelectedFile(null);
    setFormData({ name: "", alt: "", caption: "" });
    setDragActive(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Upload Media</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!selectedFile ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? "border-rose-500 bg-rose-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="text-lg font-medium text-gray-900 mb-2">
                Drop files here or click to upload
              </div>
              <div className="text-sm text-gray-500 mb-4">
                Support for images, videos, and documents
              </div>
              <input
                type="file"
                className="hidden"
                id="file-upload"
                accept="image/*,video/*,.pdf,.doc,.docx"
                onChange={(e) =>
                  e.target.files?.[0] && handleFileSelect(e.target.files[0])
                }
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                Choose File
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <File className="h-8 w-8 text-gray-400" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-gray-900 truncate">
                    {selectedFile.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFile(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">File Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter file name"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="alt">Alt Text</Label>
                  <Input
                    id="alt"
                    value={formData.alt}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, alt: e.target.value }))
                    }
                    placeholder="Describe the image for accessibility"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="caption">Caption</Label>
                  <Textarea
                    id="caption"
                    value={formData.caption}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        caption: e.target.value,
                      }))
                    }
                    placeholder="Optional caption or description"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!selectedFile}
              className="bg-rose-500 hover:bg-rose-600 text-white"
            >
              Upload
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
