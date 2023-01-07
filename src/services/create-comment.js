import { axiosInstance } from "./axios-instance";

export const createComment = async (movieId, payload) => {
  try {
    const { data } = await axiosInstance.post(`movies/${movieId}/comments`, payload);

    return {
      comment: data,
    };
  } catch (error) {
    const errorSummary = error?.response?.data ?? { title: error.message };

    return {
      error: errorSummary,
    };
  }
};
