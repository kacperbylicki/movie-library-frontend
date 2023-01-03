import { axiosInstance } from "./axios-instance";
import { router } from "../router";
import { store } from "../store";

export const setupInterceptors = () => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const {
                getters: { accessToken },
            } = store;

            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }

            return config;
        },
        (error) => Promise.reject(error),
    );

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response.status === 401 && originalRequest.url.includes("accounts/refresh-token")) {
                store.commit("clearAccountData");
                await router.push("/login");
                return Promise.reject(error);
            }

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                await store.dispatch("refreshToken");
                return axiosInstance(originalRequest);
            }

            return Promise.reject(error);
        },
    );
};