// export const apiBaseUrl = viteEnvs.VITE_HOST_API;
import axios from "axios";
import { store } from "../redux/store";
import { dispatchSetAccessToken } from "../redux/userSlice";

const apiBaseUrl = "https://www.pillartechnologybackend.com.ng/";

export const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (request) => {
    const stored = store.getState();
    const token = stored.user.access_token;
    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error?.response.status === 401 &&
      error?.response.data.detail === "expired-token"
    ) {
      try {
        // Log information about token refresh
        console.log("Token expired. Refreshing...");
        // Extract the refresh token from your stored state
        const stored = store.getState();
        const refreshToken = stored.user.user.refresh_token;

        const response = await axiosInstance.post(
          `${apiBaseUrl}auth/refresh`,
          {},
          {
            headers: {
              "refresh-Token": `${refreshToken}`,
            },
          }
        );

        const access_token = response?.data.access_token;

        store.dispatch(dispatchSetAccessToken({ access_token }));

        // Log information about successful token refresh
        console.log("Token refreshed successfully.");

        // Retry the original request with the new access token
        return axiosInstance(error.config);
      } catch (error: any) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
