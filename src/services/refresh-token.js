import { axiosInstance } from "./axios-instance";

export const refreshTokens = async (userId, refreshToken) => {
  try {
    const { data } = await axiosInstance.post("/accounts/refresh-token", { userId, refreshToken });

    return {
      ...data,
    };
  } catch (error) {
    const errorSummary = error?.response?.data ?? { title: error.message };

    return {
      error: errorSummary,
    };
  }
};
