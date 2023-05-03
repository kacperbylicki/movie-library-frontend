import * as yup from "yup";

const AmountOfPlays = {
  one: 1,
  three: 2,
  unlimited: 3,
};

export const rentMovieValidationSchema = yup.object().shape({
  amountOfPlays: yup.mixed().oneOf(Object.values(AmountOfPlays)).required("test"),
});
