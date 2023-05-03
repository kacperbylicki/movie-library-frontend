import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be 64 characters maximum")
    .required("Password is required"),
});
