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

export interface NewMediaRequest {
  url: string;
  altText: string;
  fileName: string;
  contentType: string;
  sizeInBytes: number;
  file: File; // This is the native browser File object for uploads
}
