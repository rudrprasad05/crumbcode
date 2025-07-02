"use server";

import { axiosGlobal } from "@/lib/axios";
import { FromModelToNewRequestDTO } from "@/mappers/CakeMapper";
import { Cake } from "@/types";

export async function GetAllCakes(token?: string): Promise<Cake[]> {
  const res = await axiosGlobal.get<Cake[]>("cake/get-all", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function GetOneCake(uuid?: string): Promise<Cake> {
  const res = await axiosGlobal.get<Cake>("cake/get-one?uuid=" + uuid);
  return res.data;
}

export async function SaveCake(
  cake: Partial<Cake>,
  uuid?: string
): Promise<Cake> {
  let dto = FromModelToNewRequestDTO(cake as Cake);
  const res = await axiosGlobal.post<Cake>("cake/upsert?uuid=" + uuid, dto);

  return res.data;
}
