import { axiosInstance } from "./axios-instance";

export const rentMovie = async (movieId, payload) => {
  try {
    const { data } = await axiosInstance.post(`/rentals/${movieId}`, payload);

    return {
      ...data,
    };
  } catch (error) {
    const errorResponse = error?.response;
    const errorTitle = errorResponse?.data?.explanation;

    const errorSummary = {
      ...errorResponse?.data,
      title: errorTitle ?? "Unknown error occurred",
    };

    return {
      error: errorSummary ?? { title: error.message },
    };
  }
};
