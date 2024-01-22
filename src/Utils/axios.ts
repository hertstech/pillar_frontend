// export const apiBaseUrl = viteEnvs.VITE_HOST_API;
import axios from "axios";
import { store } from "../redux/store";
import { dispatchLogout, dispatchSetAccessToken } from "../redux/userSlice";

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

// Counter to track the number of refresh attempts
let refreshAttempts = 0;
const maxRefreshAttempts = 5;

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error?.response.status === 401 ||
      error?.response.data.detail === "expired_token"
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

        // Update the local storage with the new access token
        window.localStorage.setItem("access_token", access_token);

        // Log information about successful token refresh
        console.log("Token refreshed successfully.");

        // Retry the original request with the new access token
        return axiosInstance(error.config);
      } catch (error: any) {
        // Check if the maximum number of refresh attempts has been reached
        refreshAttempts++;
        if (refreshAttempts >= maxRefreshAttempts) {
          console.log("Exceeded maximum refresh attempts. Logging out...");

          // Perform the logout action (you need to implement your logout logic)
          // Example:
          store.dispatch(dispatchLogout());
          // return navigate("/auth/login");
        } else if (error?.response.data.detail === "expired-token") {
          store.dispatch(dispatchLogout());
        }
        return Promise.reject(error);
      }
    }

    // if()
    // Reject for other non-401 errors
    return Promise.reject(error);
  }
);
