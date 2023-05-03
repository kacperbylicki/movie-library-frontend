import { axiosInstance } from "./axios-instance";

export const getVideoStream = async (movieId) => {
  try {
    const { data } = await axiosInstance.get(`/rentals/${movieId}/stream`);

    return {
      ...data,
    };
  } catch (error) {
    console.log(error);
    const errorSummary = error?.response?.data ?? { title: error.message };

    return {
      error: errorSummary,
    };
  }
};
