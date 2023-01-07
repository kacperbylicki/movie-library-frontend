import { axiosInstance } from "./axios-instance";

export const confirmAccount = async (payload) => {
  try {
    await axiosInstance.post("accounts/confirm", payload);

    return {
      userConfirmed: true,
    };
  } catch (error) {
    const errorResponse = error?.response;
    const errorTitle = errorResponse?.data?.explanation;

    const errorSummary = {
      ...errorResponse?.data,
      title: errorTitle ?? errorResponse?.data?.title,
    };

    return {
      error: errorSummary,
    };
  }
};
