import axios from "axios";
import { store } from "../redux/store";
import { dispatchLogout, dispatchSetAccessToken } from "../redux/userSlice";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const viteEnvs = import.meta.env;

export const apiBaseUrl = viteEnvs.VITE_HOST_API;

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

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
      error?.response.data.detail === "access-token expired"
    ) {
      try {
        console.log("Token expired. Refreshing...");

        const stored = store.getState();
        const refreshToken = stored.user.user.refresh_token;
        console.log("refresh token ;", refreshToken);
        const oldAccessToken = stored.user.access_token;
        console.log("old access token state;", oldAccessToken);

        // Send both refresh token and old access token
        const response = await axiosInstance.post(
          `${apiBaseUrl}auth/refresh`,
          {},
          {
            headers: {
              "refresh-Token": `${refreshToken}`,
              "access-token": oldAccessToken.toString(),
            },
          }
        );

        const access_token = response?.data.access_token;

        store.dispatch(dispatchSetAccessToken({ access_token }));

        window.localStorage.setItem("access_token", access_token);

        console.log("Token refreshed successfully.");

        // Retry the original request with the new access token
        return axiosInstance(error.config);
      } catch (error: any) {
        return Promise.reject(error);
      }
    }

    if (
      (error?.response.status === 401 &&
        error?.response.data.detail === "refresh-token expired") ||
      error?.response.data.detail === "Not authenticated" ||
      error?.response.data.detail === "Invalid refresh token" ||
      error?.response.data.detail === "invalid-token" ||
      error?.response.status === 500
    ) {
      Toast.fire({
        icon: "info",
        title: "Your session has timed out",
      });

      store.dispatch(dispatchLogout());

      <Navigate to="/auth/login" />;
    }
    return Promise.reject(error);
  }
);
