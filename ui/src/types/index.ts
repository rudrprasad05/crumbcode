export type Folder = {
  id: string;
  name: string;
  parent: Folder | null;
  parentId: string | null;
  children: Folder[];
  medias: Media[];
  user: User;
  userId: string;
  createdAt: string;
  updatedAt: string | null;
  star: boolean;
};

export interface Media {
  id: number;
  uuid: string;
  createdOn: string; // or Date, see note below
  updatedOn: string; // or Date, see note below
  url: string;
  altText: string;
  objectKey: string;
  fileName: string;
  contentType: string;
  sizeInBytes: number;
}

export type SharedUsers = {
  id: string;
  user: User;
  share: Share;
  shareId: string;
  userId: string;
};

export type Share = {
  id: string;
  type: number;
  url: string;
  sharedUsers: SharedUsers[];
  mediaId: string;
  media: Media;
};

type MediaType = 0 | 1;

export type User = {
  id: string;
  email: string;
  username: string;
};

export interface NewMediaRequest {
  url: string;
  altText: string;
  fileName: string;
  contentType: string;
  sizeInBytes: number;
  file: File; // This is the native browser File object for uploads
}
