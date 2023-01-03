import * as yup from "yup";

export const registerValidationSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Email is invalid"),
  username: yup
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(64, "Username must be 64 characters maximum")
    .required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be 64 characters maximum")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password Confirmation is required"),
});
