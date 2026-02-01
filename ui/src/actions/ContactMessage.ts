"use server";

import { ContactFormValues } from "@/components/home/contact-form";
import { axiosGlobal } from "@/lib/axios";
import { buildMediaQueryParams } from "@/lib/params";
import { ApiResponse, CakeQueryObject, ContactMessage } from "@/types";
import { GetToken } from "./User";

export async function CreateMessage(
  data: ContactFormValues,
): Promise<ApiResponse<ContactMessage>> {
  const token = await GetToken();

  try {
    const res = await axiosGlobal.post<ApiResponse<ContactMessage>>(
      `/contact/upsert`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res.data;
  } catch (error) {
    console.dir(error);
    return {} as any;
  }
}

export async function GetAllContactMessages(
  query?: CakeQueryObject,
): Promise<ApiResponse<ContactMessage[]>> {
  const token = await GetToken();
  const params = buildMediaQueryParams(query);

  const res = await axiosGlobal.get<ApiResponse<ContactMessage[]>>(
    `/contact/get-all?${params}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return res.data;
}
