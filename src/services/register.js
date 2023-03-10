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
    const errorResponse = error?.response;
    const errorTitle = errorResponse?.data?.explanation;

    const errorSummary = {
      ...errorResponse?.data,
      title: errorTitle ?? "Unknown error occurred",
    };

    return {
      error: errorSummary,
    };
  }
};
