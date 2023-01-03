import { axiosInstance } from "./axios-instance";

export const getMovies = async () => {
  try {
    const { data } = await axiosInstance.get("movies");

    return {
      movies: data,
    };
  } catch (error) {
    const errorSummary = error?.response?.data ?? { title: error.message };

    return {
      error: errorSummary,
    };
  }
};
