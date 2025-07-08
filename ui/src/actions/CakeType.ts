"use server";

import { axiosGlobal } from "@/lib/axios";
import { CakeType, Media, NewCakeTypeRequest, NewMediaRequest } from "@/types";
import axios from "axios";
import { redirect } from "next/navigation";
import { GetToken } from "./User";

export async function GetAllCakeTypes(token?: string): Promise<CakeType[]> {
  const res = await axiosGlobal.get<CakeType[]>("caketype/get-all");
  return res.data;
}

export async function CreateCakeType(form: NewCakeTypeRequest) {
  try {
    const res = await axiosGlobal.post("caketype/create", form);
    return res.data;
  } catch (error) {
    console.dir(error, { depth: null });
  }
}

export async function GetStarMedia() {
  const token = await GetToken();
  if (!token) {
    return redirect("/");
  }
  const res = await axiosGlobal.get<Partial<Media>[]>(
    "media/get-all?IsStarred=true"
  );

  return res.data;
}

export async function SumMedia() {
  const token = await GetToken();
  if (!token) {
    return redirect("/");
  }
  const res = await axiosGlobal.get<number>("media/sum");

  return res.data;
}

export async function GetDeleted() {
  const token = await GetToken();
  if (!token) {
    return redirect("/");
  }
  const res = await axiosGlobal.get<Partial<Media>[]>(
    "media/get-all?IsDeleted=true"
  );

  return res.data;
}

export async function RenameMedia(name: string, id: string) {
  const res = await axiosGlobal.patch<Partial<Media>[]>("media/rename/" + id, {
    name,
  });

  return res.data;
}

export async function DeleteMedia(id: string) {
  const token = await GetToken();
  if (!token) {
    return redirect("/");
  }
  const res = await axiosGlobal.delete<Partial<Media>[]>("media/recycle/" + id);

  return res.data;
}

export async function DeleteForever(id: string) {
  const token = await GetToken();
  //   if (!token) {
  //     return redirect("/");
  //   }
  const res = await axiosGlobal.delete<Partial<Media>[]>("media/delete/" + id);

  return res.data;
}

export async function GetOne(id: string): Promise<Partial<Media>> {
  try {
    const token = await GetToken();

    if (!token || token == "" || token == undefined) {
      return redirect("/errors/403");
    }
    const res = await axiosGlobal.get<Partial<Media>>("media/get-one/" + id);

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
