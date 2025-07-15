"use server";

import { axiosGlobal } from "@/lib/axios";
import { buildMediaQueryParams } from "@/lib/params";
import { ApiResponse, MediaQueryObject, SocialMedia } from "@/types";
import { GetToken } from "./User";

export async function GetAllSocialMedia(
  query?: MediaQueryObject
): Promise<ApiResponse<SocialMedia[]>> {
  const token = await GetToken();
  const params = buildMediaQueryParams(query);

  console.log(token, params);

  try {
    const res = await axiosGlobal.get<ApiResponse<SocialMedia[]>>(
      `social-media/get-all?${params}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    const tmp: ApiResponse<SocialMedia[]> = {
      success: false,
      statusCode: 400,
      timestamp: Date.now().toLocaleString(),
      data: [],
    };
    return tmp;
  }
}

export async function CreateSocialMedia(
  dto: Partial<SocialMedia>,
  uuid?: string
): Promise<SocialMedia> {
  const res = await axiosGlobal.post<SocialMedia>(
    "social-media/upsert?uuid=" + uuid,
    dto
  );

  return res.data;
}

export async function GetOneSocialMedia(
  uuid?: string
): Promise<ApiResponse<SocialMedia>> {
  const res = await axiosGlobal.get<ApiResponse<SocialMedia>>(
    "social-media/get-one?uuid=" + uuid
  );
  console.log(res);
  return res.data;
}
