import { axiosInstance } from "./axios-instance";

export const createMovie = async (payload) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.post("movies", payload);

    return {
      movie: data,
    };
  } catch (error) {
    const errorSummary = error?.response?.data ?? { title: error.message };

    return {
      error: errorSummary,
    };
  }
};
