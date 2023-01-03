import { axiosInstance } from "./axios-instance";

export const logoutAccount = async () => {
  try {
    await axiosInstance.post("/accounts/logout");

    return {};
  } catch (error) {
    const errorSummary = error?.response?.data ?? { title: error.message };

    return {
      error: errorSummary,
    };
  }
};
