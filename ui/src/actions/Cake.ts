"use server";

import { axiosGlobal } from "@/lib/axios";
import { buildMediaQueryParams } from "@/lib/params";
import { FromModelToNewRequestDTO } from "@/mappers/CakeMapper";
import { ApiResponse, Cake, QueryObject } from "@/types";
import { GetToken } from "./User";

export async function GetAllCakes(
  query?: QueryObject,
): Promise<ApiResponse<Cake[]>> {
  const token = await GetToken();
  const params = buildMediaQueryParams(query);

  const res = await axiosGlobal.get<ApiResponse<Cake[]>>(
    `/cake/get-all?${params}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
}

export async function GetOneCake(uuid?: string): Promise<ApiResponse<Cake>> {
  const token = await GetToken();

  const res = await axiosGlobal.get<ApiResponse<Cake>>(
    "/cake/get-one?uuid=" + uuid,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
}

export async function RestoreCake(uuid?: string): Promise<ApiResponse<Cake>> {
  const token = await GetToken();

  const res = await axiosGlobal.post<ApiResponse<Cake>>(
    "/cake/restore?uuid=" + uuid,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
}

export async function SaveCake(
  cake: Partial<Cake>,
  uuid?: string,
): Promise<Cake> {
  const dto = FromModelToNewRequestDTO(cake as Cake);
  const token = await GetToken();

  const res = await axiosGlobal.post<Cake>("/cake/upsert?uuid=" + uuid, dto, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
}

export async function SafeDeleteCake(uuid: string): Promise<ApiResponse<Cake>> {
  const token = await GetToken();

  const res = await axiosGlobal.delete<ApiResponse<Cake>>(
    "/cake/safe-delete/" + uuid,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return res.data;
}
