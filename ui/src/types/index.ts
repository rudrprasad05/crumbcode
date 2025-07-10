import { inherits } from "util";

export interface BaseModel {
  id: number;
  uuid: string;
  createdOn: string;
  updatedOn: string;
}

export interface Cake extends BaseModel {
  name: string;
  description: string;
  type: string;
  isAvailable: boolean;
  price: number;

  mediaId?: number; // nullable FK
  media?: Partial<Media> | null;

  cakeTypeId: number;
  cakeType: CakeType;

  //   allergens: Allergen[];
}

export interface IconType {
  name: string;
  Icon: any;
}

export interface CakeType extends BaseModel {
  name: string;
  color: string;
  description: string;
}

export interface Media extends BaseModel {
  url: string;
  altText: string;
  objectKey: string;
  fileName: string;
  contentType: string;
  sizeInBytes: number;
}

export interface Notification extends BaseModel {
  title: string;
  message: string;
  isRead: boolean;
  type: "info" | "warning" | "error";
  userId?: number;
}

export interface SocialMedia extends BaseModel {
  name: string;
  icon: string;
  url: string;
  isActive: boolean;
}

export interface User {
  username: string;
  id: string;
  email: string;
  token: string;
  role: "Admin" | "User";
}

export const CakeTypeColors = [
  "gray-600",
  "rose-600",
  "blue-600",
  "green-600",
  "purple-600",
  "yellow-600",
];

export const CakeTypeColorClasses: Record<string, string> = {
  "gray-600": "bg-gray-600 border-gray-600/50",
  "rose-600": "bg-rose-600 border-rose-600/50",
  "blue-600": "bg-blue-600 border-blue-600/50",
  "green-600": "bg-green-600 border-green-600/50",
  "purple-600": "bg-purple-600 border-purple-600/50",
  "yellow-600": "bg-yellow-600 border-yellow-600/50",
};

export interface NewCakeTypeRequest {
  name: string;
  description: string;
  color: string;
}

export interface NewCakeRequest {
  name: string;
  description: string;
  type: string;
  isAvailable: boolean;
  price: number;
  mediaId?: number; // optional
  cakeTypeId: number;
}

export interface NewMediaRequest {
  url: string;
  altText: string;
  fileName: string;
  contentType: string;
  sizeInBytes: number;
  file: File; // This is the native browser File object for uploads
}

export interface MediaQueryObject {
  pageNumber?: number;
  pageSize?: number;
}

export interface MetaData {
  pageSize: number;
  totalCount: number;
  pageNumber: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean; // True/false operation flag
  statusCode: number; // HTTP status code
  message?: string; // Human-readable message
  data?: T; // Actual data payload
  meta?: MetaData; // Extra metadata (pagination, etc.)
  errors?: string[]; // For validation or server-side errors
  timestamp: string; // ISO timestamp (e.g., "2025-07-05T10:00:00Z")
}
