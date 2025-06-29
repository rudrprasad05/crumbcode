"use server";

import { axiosGlobal } from "@/lib/axios";
import {
  Cake,
  CakeType,
  Media,
  NewCakeTypeRequest,
  NewMediaRequest,
} from "@/types";
import axios from "axios";
import { redirect } from "next/navigation";
import { GetToken } from "./User";

export async function GetAllCakes(token?: string): Promise<Cake[]> {
  const res = await axiosGlobal.get<Cake[]>("cake/get-all", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
