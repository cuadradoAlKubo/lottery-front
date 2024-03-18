import { useState } from "react";

interface ApiHook {
  get: (url: string) => Promise<Response>;
  post: (url: string, data: any) => Promise<Response>;
  del: (url: string) => Promise<Response>;
  put: (url: string, data: any) => Promise<Response>;
  patch: (url: string, data: any) => Promise<Response>;
  loading: boolean;
  error: Error | null;
}

export default function useApi(): ApiHook {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const request = async (
    method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH",
    url: string,
    data?: any
  ): Promise<Response> => {
    setLoading(true);
    try {
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      if (data) {
        options.body = JSON.stringify(data);
      }
      const response = await fetch(url, options);
      setLoading(false);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (err) {
      setLoading(false);
      setError(err as Error);
      throw err;
    }
  };

  const get = (url: string) => request("GET", url);
  const post = (url: string, data: any) => request("POST", url, data);
  const del = (url: string) => request("DELETE", url);
  const put = (url: string, data: any) => request("PUT", url, data);
  const patch = (url: string, data: any) => request("PATCH", url, data);

  return { get, post, del, put, patch, loading, error };
}
