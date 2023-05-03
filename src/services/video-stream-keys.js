import { axiosInstance } from "./axios-instance";

export const getVideoStreamKeys = async () => {
  try {
    const { data } = await axiosInstance.get(`/videos`);

    return {
      data,
    };
  } catch (error) {
    const errorSummary = error?.response?.data ?? { title: error.message };

    return {
      error: errorSummary,
    };
  }
};
