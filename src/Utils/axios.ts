// export const apiBaseUrl = viteEnvs.VITE_HOST_API;
import axios from "axios";
import { store } from "../redux/store";
import { dispatchLogout, dispatchSetAccessToken } from "../redux/userSlice";
// import { useNavigate } from "react-router-dom";

// function getLocalAccessToken() {
//   const access_token = window.localStorage.getItem("access_token");
//   return access_token;
// }

// function getLocalRefreshToken() {
//   const refresh_token = window.localStorage.getItem("refresh_token");
//   return refresh_token;
// }

// const serverAxios = axios.create({
//   withCredentials: true,
// });

// export const server = axios.create({
//   baseURL: "http://138.68.162.159:8000/",
//   withCredentials: true,
// });

// server.interceptors.request.use(
//   (request) => {
//     const token = getLocalAccessToken();
//     if (token) {
//       request.headers["x-access-token"] = token;
//     }
//     return request;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// server.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     if (
//       error?.response.status === 401 &&
//       error?.response.data.message === "Expired Session"
//     ) {
//       try {
//         const refreshToken = getLocalRefreshToken();
//         if (!refreshToken) {
//           // Handle the case when there is no refresh token
//           throw new Error("No refresh token available");
//         }

//         const refreshResponse = await serverAxios.post(
//           "http://138.68.162.159:8000/auth/refresh",
//           { refresh_token: refreshToken },
//           { withCredentials: true }
//         );

//         const newAccessToken = refreshResponse?.data?.data?.access_token;

//         // Update the local storage with the new access token
//         window.localStorage.setItem("access_token", newAccessToken);

//         // Retry the original request with the new access token
//         return server(error.config);
//       } catch (error: any) {
//         sessionStorage.clear();
//         localStorage.removeItem("user");
//         localStorage.removeItem("token");
//         localStorage.clear();

//         if (error.response.data) {
//           return Promise.reject(error.response.data);
//         }
//         return Promise.reject(error);
//       }
//     }
//   }
// );

// export const PillarApi = async ({ options, auth }: any) => {
//   if (!options) {
//     throw new Error("Options for server call required as first argument");
//   }

//   const { url, body, method, headers } = options;

//   if (!method) {
//     throw new Error("Method required as a key value of options");
//   }

//   if (!url) {
//     throw new Error("Url required as key value of options");
//   }
//   const updateMethods = ["post", "patch", "put"];
//   if (updateMethods.includes(method.toLowerCase()) && !body) {
//     throw new Error("Cannot send empty body in request");
//   }
//   // Extract token from auth (if available)
//   const token = auth && auth.token;

//   return server(url, {
//     method,
//     data: body,
//     withCredentials: true,
//     headers: {
//       "Content-Type": "application/json",
//       ...(token && { Authorization: `Bearer ${token}` }),
//       ...headers,
//     },
//   });
// };

// export default PillarApi;

// const navigate = useNavigate();

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
        console.log(refreshToken);

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

        console.log(access_token);

        store.dispatch(dispatchSetAccessToken({ access_token }));

        // Update the local storage with the new access token
        window.localStorage.setItem("access_token", access_token);

        // Log information about successful token refresh
        console.log("Token refreshed successfully.");

        // Retry the original request with the new access token
        return axiosInstance(error.config);
      } catch (error) {
        // Check if the maximum number of refresh attempts has been reached
        refreshAttempts++;
        if (refreshAttempts >= maxRefreshAttempts) {
          console.log("Exceeded maximum refresh attempts. Logging out...");

          // Perform the logout action (you need to implement your logout logic)
          // Example: store.dispatch(logoutAction());
          store.dispatch(dispatchLogout());
          // return navigate("/auth/login");
        }

        return Promise.reject(error);
      }
    }
    // Reject for other non-401 errors
    return Promise.reject(error);
  }
);
