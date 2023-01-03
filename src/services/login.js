import { axiosInstance } from "./axios-instance";

export const loginAccount = async (payload) => {
  try {
    const {
      data: { tokens, user, groups },
    } = await axiosInstance.post("accounts/login", payload);

    return {
      ...tokens,
      user,
      groups,
    };
  } catch (error) {
    const errorSummary = {
      ...error?.response?.data,
      title:
        error.response.status === 401 ? "Invalid username or password" : "Unknown error occurred",
    } ?? { title: error.message };

    return {
      error: errorSummary,
    };
  }
};
