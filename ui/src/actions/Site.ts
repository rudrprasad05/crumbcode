"use server";

import { axiosGlobal } from "@/lib/axios";
import { FromModelToNewRequestDTO } from "@/mappers/CakeMapper";
import {
  ApiResponse,
  Cake,
  Media,
  MediaQueryObject,
  SocialMedia,
} from "@/types";
import { GetToken } from "./User";
import { buildMediaQueryParams } from "@/lib/params";

export async function GetAllCakesSite(
  query?: MediaQueryObject
): Promise<ApiResponse<Cake[]>> {
  const params = buildMediaQueryParams(query);

  const res = await axiosGlobal.get<ApiResponse<Cake[]>>(
    `site/get-all-cakes?${params}`
  );

  return res.data;
}

export async function GetAllSocialMediaSite(
  query?: MediaQueryObject
): Promise<ApiResponse<SocialMedia[]>> {
  const params = buildMediaQueryParams(query);

  try {
    const res = await axiosGlobal.get<ApiResponse<SocialMedia[]>>(
      `site/get-all-social-media?${params}`
    );

    return res.data;
  } catch (error) {
    const tmp: ApiResponse<SocialMedia[]> = {
      success: false,
      statusCode: 400,
      timestamp: Date.now().toLocaleString(),
      data: [],
    };
    return tmp;
  }
}

export async function GetStorageUsed(
  query?: MediaQueryObject
): Promise<ApiResponse<number>> {
  const params = buildMediaQueryParams(query);

  try {
    const res = await axiosGlobal.get<ApiResponse<number>>(
      `site/get-storage-used?${params}`
    );

    return res.data;
  } catch (error) {
    const tmp: ApiResponse<number> = {
      success: false,
      statusCode: 400,
      timestamp: Date.now().toLocaleString(),
      data: 0,
    };
    return tmp;
  }
}

export async function GetMediaSite(
  query?: MediaQueryObject
): Promise<ApiResponse<Media[]>> {
  const token = await GetToken();
  const params = buildMediaQueryParams(query);

  console.log(query);

  const res = await axiosGlobal.get<ApiResponse<Media[]>>(
    `site/get-all-media?${params}`
  );
  return res.data;
}
