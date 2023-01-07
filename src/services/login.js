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
    const errorResponse = error?.response;
    const errorTitle = errorResponse?.data?.explanation;

    const errorSummary = {
      ...errorResponse?.data,
      title: errorTitle ?? "Unknown error occurred",
    };

    return {
      error: errorSummary ?? { title: error.message },
    };
  }
};
