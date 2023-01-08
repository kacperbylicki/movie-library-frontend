import { axiosInstance } from "./axios-instance";

export const deleteMovie = async (movieId) => {
  try {
    await axiosInstance.delete(`movies/${movieId}`);

    return {};
  } catch (error) {
    const errorSummary = error?.response?.data ?? { title: error.message };

    return {
      error: errorSummary,
    };
  }
};
