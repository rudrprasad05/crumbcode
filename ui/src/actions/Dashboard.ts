"use server";

import { axiosGlobal } from "@/lib/axios";
import { buildMediaQueryParams } from "@/lib/params";
import { ApiResponse, Cake, DashboardData, MediaQueryObject } from "@/types";
import { GetToken } from "./User";

export async function GetDashboardData(
  query?: MediaQueryObject
): Promise<ApiResponse<DashboardData>> {
  const token = await GetToken();

  const res = await axiosGlobal.get<ApiResponse<DashboardData>>(
    `dashboard/get`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data;
}
