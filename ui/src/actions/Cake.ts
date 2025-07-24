"use server";

import { axiosGlobal } from "@/lib/axios";
import { FromModelToNewRequestDTO } from "@/mappers/CakeMapper";
import { ApiResponse, Cake, MediaQueryObject } from "@/types";
import { GetToken } from "./User";
import { buildMediaQueryParams } from "@/lib/params";

export async function GetAllCakes(
  query?: MediaQueryObject
): Promise<ApiResponse<Cake[]>> {
  const token = await GetToken();
  const params = buildMediaQueryParams(query);

  const res = await axiosGlobal.get<ApiResponse<Cake[]>>(
    `cake/get-all?${params}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}

export async function GetOneCake(uuid?: string): Promise<ApiResponse<Cake>> {
  const token = await GetToken();

  const res = await axiosGlobal.get<ApiResponse<Cake>>(
    "cake/get-one?uuid=" + uuid,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}

export async function SaveCake(
  cake: Partial<Cake>,
  uuid?: string
): Promise<Cake> {
  const dto = FromModelToNewRequestDTO(cake as Cake);
  const token = await GetToken();

  const res = await axiosGlobal.post<Cake>("cake/upsert?uuid=" + uuid, dto, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
}

export async function SafeDeleteCake(uuid: string): Promise<ApiResponse<Cake>> {
  const token = await GetToken();
  //   if (!token) {
  //     return redirect("/");
  //   }
  const res = await axiosGlobal.delete<ApiResponse<Cake>>(
    "cake/safe-delete/" + uuid,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data;
}
