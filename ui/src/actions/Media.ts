"use server";

import { axiosGlobal } from "@/lib/axios";
import { buildMediaQueryParams } from "@/lib/params";
import { ApiResponse, Media, MediaQueryObject } from "@/types";
import axios from "axios";
import { redirect } from "next/navigation";
import { GetToken } from "./User";

export async function GetMedia(
  query?: MediaQueryObject
): Promise<ApiResponse<Media[]>> {
  const token = await GetToken();
  const params = buildMediaQueryParams(query);

  const res = await axiosGlobal.get<ApiResponse<Media[]>>(
    `media/get-all?${params}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}

export async function GetOneMedia(uuid: string): Promise<ApiResponse<Media>> {
  const token = await GetToken();
  const res = await axiosGlobal.get<ApiResponse<Media>>(
    "media/get-one/" + uuid,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}

export async function UploadOneFile(
  form: FormData,
  uuid?: string
): Promise<ApiResponse<Media>> {
  let apistr = "";
  const token = await GetToken();

  if (uuid && uuid.trim().length > 0) {
    apistr = "media/upsert?uuid=" + uuid;
  } else {
    apistr = "media/upsert";
  }

  const res = await axiosGlobal.post(apistr, form, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function SumMedia() {
  const token = await GetToken();
  if (!token) {
    return redirect("/");
  }
  const res = await axiosGlobal.get<number>("media/sum", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
}

export async function SafeDeleteMedia(
  uuid: string
): Promise<ApiResponse<Media>> {
  const token = await GetToken();

  const res = await axiosGlobal.delete<ApiResponse<Media>>(
    "media/safe-delete/" + uuid,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data;
}

export async function GetOne(id: string): Promise<Partial<Media>> {
  try {
    const token = await GetToken();

    if (!token || token == "" || token == undefined) {
      return redirect("/errors/403");
    }
    const res = await axiosGlobal.get<Partial<Media>>("media/get-one/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400 || error.response?.status === 403) {
        return redirect("/errors/403");
      }
    }

    console.error("Unexpected error:", error);
    return redirect("/errors/403");
  }
}
