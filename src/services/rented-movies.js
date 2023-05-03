import { axiosInstance } from "./axios-instance";

export const getUserRentedMovies = async () => {
  try {
    const { data } = await axiosInstance.get("/rentals");

    return { rentedMovies: data };
  } catch (error) {
    const errorSummary = error?.response?.data ?? { title: error.message };

    return {
      error: errorSummary,
    };
  }
};
