import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "@/models/api-response";
import { callExternalApi } from "./external-api.service";
import { jwtDecode } from "jwt-decode";
const apiServerUrl = import.meta.env.VITE_BASE_API_URL;

export const getPublicResource = async (): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/public`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return {
    data,
    error,
  };
};

export const getProtectedResource = async (accessToken:string): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/private`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return {
    data,
    error,
  };
};

export const getAdminResource = async (accessToken:string): Promise<ApiResponse> => {
  console.log(jwtDecode(accessToken))
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/admin`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      
    },
  };
   console.log(accessToken)
  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return {
    data,
    error,
  };
};
