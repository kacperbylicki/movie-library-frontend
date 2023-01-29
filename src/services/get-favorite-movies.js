import { axiosInstance } from "./axios-instance";

export const getFavoriteMovies = async () => {
  try {
    const { data } = await axiosInstance.get("movies/favorites");

    return {
      favorites: data,
    };
  } catch (error) {
    const errorSummary = error?.response?.data ?? { title: error.message };

    return {
      error: errorSummary,
    };
  }
};
