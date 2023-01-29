import { axiosInstance } from "./axios-instance";

export const upsertFavoriteMovie = async (movieId, payload) => {
  try {
    await axiosInstance.post(`movies/${movieId}/favorite`, payload);

    return {};
  } catch (error) {
    const errorSummary = error?.response?.data ?? { title: error.message };

    return {
      error: errorSummary,
    };
  }
};
