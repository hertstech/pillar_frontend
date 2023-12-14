// export const apiBaseUrl = viteEnvs.VITE_HOST_API;
import axios from "axios";
import { store } from "../redux/store";
import { dispatchSetAccessToken } from "../redux/userSlice";

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

const apiBaseUrl = "https://138.68.162.159:8000/";

export const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  //  { withCredentials: true,}
});

axiosInstance.interceptors.request.use(
  (request) => {
    const stored = store.getState();
    const token = stored.user.access_token;
    if (token) {
      request.headers["Authorization"] = `bearer ${token}`;
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
      error?.response.data.message === "Expired Session"
    ) {
      try {
        const response = await axiosInstance.post(
          "https://138.68.162.159:8000/auth/refresh",

          { withCredentials: true }
        );

        const { access_token } = response?.data?.data;

        store.dispatch(dispatchSetAccessToken({ access_token }));

        // Update the local storage with the new access token
        window.localStorage.setItem("access_token", access_token);

        // Retry the original request with the new access token
        return axiosInstance(error.config);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
);
