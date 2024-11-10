import { AxiosRequestConfig } from "axios";

import { ApiResponse } from "@/models/api-response";
import { callExternalApi } from "./external-api.service";
const apiServerUrl = import.meta.env.VITE_BASE_API_URL;
const apiAuth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
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
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/admin`,
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

export async function getUserMetadata(userId: string | undefined,accessToken:string) {
  try {
    if (!userId) throw new Error('User ID is required');

    const response = await fetch(
      `https://${apiAuth0Domain}/api/v2/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user metadata');
    }

    const userData = await response.json();
    return userData.user_metadata || {};
  } catch (error) {
    console.error('Error fetching user metadata:', error);
    throw error;
  }
}