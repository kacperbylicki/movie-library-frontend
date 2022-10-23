import { axiosInstance } from "./axios-instance";

export const createMovie = async (payload) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.post("/api/Movies", payload);

    return {
      movie: data,
    };
  } catch (error) {
    const errorSummary = error?.response?.data ?? { message: error.message };

    return {
      error: errorSummary,
    };
  }
};
