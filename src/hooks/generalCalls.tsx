import { useState } from "react";
import Swal from "sweetalert2";
import { axiosInstance } from "../Utils";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiRequest = async (
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    data?: any
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance({
        method,
        url,
        data,
      });
      setLoading(false);
      return response.data;
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || "An error occurred");
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text:
          err.response?.data?.message ||
          "An error occurred while processing the request.",
      });
      throw err;
    }
  };

  return { apiRequest, loading, error };
};
