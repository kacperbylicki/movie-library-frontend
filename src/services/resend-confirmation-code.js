import { axiosInstance } from "./axios-instance";

export const resendConfirmationCode = async (payload) => {
  try {
    const {
      data: { destination },
    } = await axiosInstance.post("accounts/confirm/resend", payload);

    return {
      destination,
    };
  } catch (error) {
    const errorSummary = error?.response?.data ?? { title: error.message };

    return {
      error: errorSummary,
    };
  }
};
