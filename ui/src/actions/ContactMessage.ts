"use server";

import { axiosGlobal } from "@/lib/axios";
import { buildMediaQueryParams } from "@/lib/params";
import { ApiResponse, ContactMessage, Media, MediaQueryObject } from "@/types";
import axios from "axios";
import { redirect } from "next/navigation";
import { GetToken } from "./User";
import { ContactFormValues } from "@/components/home/contact-form";

export async function CreateMessage(
  data: ContactFormValues
): Promise<ApiResponse<ContactMessage>> {
  const token = await GetToken();

  try {
    const res = await axiosGlobal.post<ApiResponse<ContactMessage>>(
      `contact/upsert`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (error) {
    console.dir(error);
    return {} as any;
  }
}

export async function GetAllContactMessages(
  query?: MediaQueryObject
): Promise<ApiResponse<ContactMessage[]>> {
  const token = await GetToken();
  const params = buildMediaQueryParams(query);

  const res = await axiosGlobal.get<ApiResponse<ContactMessage[]>>(
    `contact/get-all?${params}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data;
}
