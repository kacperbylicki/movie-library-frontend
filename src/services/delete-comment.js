import { axiosInstance } from "./axios-instance";

export const deleteComment = async (movieId, commentId) => {
  try {
    await axiosInstance.delete(`movies/${movieId}/comments/${commentId}`);

    return {};
  } catch (error) {
    const errorSummary = error?.response?.data ?? { title: error.message };

    return {
      error: errorSummary,
    };
  }
};
