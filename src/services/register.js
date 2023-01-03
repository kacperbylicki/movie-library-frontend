import { axiosInstance } from "./axios-instance";

export const registerAccount = async (payload) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.post("/accounts/register", payload);

    return {
      account: data,
    };
  } catch (error) {
    const errorSummary = {
      ...error?.response?.data,
      title:
        error.response.status === 400
          ? "Password requirements not met, or invalid parameter"
          : "Unknown error occurred",
    } ?? { title: error.message };

    return {
      error: errorSummary,
    };
  }
};
