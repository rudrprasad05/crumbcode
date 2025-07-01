"use server";

import { axiosGlobal } from "@/lib/axios";
import { Cake } from "@/types";

export async function GetAllCakes(token?: string): Promise<Cake[]> {
  const res = await axiosGlobal.get<Cake[]>("cake/get-all", {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(res.data);
  return res.data;
}

export async function GetOneCake(uuid?: string): Promise<Cake> {
  const res = await axiosGlobal.get<Cake>("cake/get-one?uuid=" + uuid);
  console.log(res.data);
  return res.data;
}
