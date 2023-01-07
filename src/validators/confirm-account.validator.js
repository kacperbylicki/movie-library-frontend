import * as yup from "yup";

export const confirmAccountValidationSchema = yup.object().shape({
  confirmationCode: yup
    .string()
    .length(6, "Confirmation code must be 6 digits long")
    .required("Confirmation code is required"),
});
