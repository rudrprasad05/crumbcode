"use server";

import { axiosGlobal } from "@/lib/axios";
import { LoginResponse } from "@/types/schema";
import { SignInFormType } from "@/types/zod";
import { AxiosResponse } from "axios";

export async function Login(
  login: SignInFormType
): Promise<AxiosResponse<LoginResponse>> {
  const res = await axiosGlobal.post<LoginResponse>("auth/login", login);
  return res;
}
