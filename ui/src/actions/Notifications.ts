import { ApiResponse, MediaQueryObject } from "@/types";
import { GetToken } from "./User";
import { buildMediaQueryParams } from "@/lib/params";
import { Notification } from "@/types";
import { axiosGlobal } from "@/lib/axios";

export async function GetAllNotifications(
  query?: MediaQueryObject
): Promise<ApiResponse<Notification[]>> {
  const token = await GetToken();
  const params = buildMediaQueryParams(query);

  const res = await axiosGlobal.get<ApiResponse<Notification[]>>(
    `/notification/get-all?${params}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data;
}

export async function MarkAsRead(
  uuid?: string
): Promise<ApiResponse<Notification>> {
  const token = await GetToken();

  const res = await axiosGlobal.get<ApiResponse<Notification>>(
    `/notification/mark-read?uuid=${uuid}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data;
}

export async function SafeDeleteNotification(
  uuid?: string
): Promise<ApiResponse<Notification>> {
  const token = await GetToken();

  const res = await axiosGlobal.delete<ApiResponse<Notification>>(
    `/notification/safe-delete?uuid=${uuid}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data;
}
