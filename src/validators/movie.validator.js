import * as yup from "yup";

const isAllowedMovieGenre = (genre) => {
  const genres = [
    "Sci-Fi",
    "Action",
    "Drama",
    "Comedy",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Thriller",
    "Western",
  ];

  return genres.includes(genre);
};

export const movieValidationSchema = yup.object().shape({
  image: yup.mixed().required("Poster image is required"),
  title: yup.string().required("Title is required"),
  genre: yup.array().of(
    yup
      .string()
      .test("valid", "Enter valid, simplified movie genre", (val) => isAllowedMovieGenre(val))
      .required("At least one genre is required"),
  ),
  producers: yup.array().of(yup.string().required("At least one producer is required")),
  directors: yup.array().of(yup.string().required("At least one director is required")),
  roles: yup.array().of(
    yup
      .object()
      .shape({
        actor: yup.string().required("Role actor name is required"),
        character: yup.string().required("Role character is required"),
      })
      .required("At least one role is required"),
  ),
  releaseYear: yup
    .number()
    .min(1900, "Release year must be at least 1900")
    .max(2022, "Release year must be up to 2022")
    .required("Release year is required"),
});
