import { axiosInstance } from "./axios-instance";

export const getMovies = async () => {
  try {
    const { data } = await axiosInstance.get("/api/Movies");

    return {
      movies: data,
    };
  } catch (error) {
    const errorSummary = error?.response?.data ?? { message: error.message };

    return {
      error: errorSummary,
    };
  }
};
