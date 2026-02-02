"use server";

import { axiosGlobal } from "@/lib/axios";
import { ApiResponse, QueryObject, DashboardData } from "@/types";
import { GetToken } from "./User";

export async function GetDashboardData(
  query?: QueryObject,
): Promise<ApiResponse<DashboardData>> {
  const token = await GetToken();

  const res = await axiosGlobal.get<ApiResponse<DashboardData>>(
    `/dashboard/get`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return res.data;
}
