import axios from "axios";
import http from "https";

const agent = new http.Agent({
  rejectUnauthorized: false,
});

export const axiosGlobal = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 100000, // 10 seconds timeout
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
  withCredentials: true,
});
