import * as yup from "yup";

export const commentValidationSchema = yup.object().shape({
  content: yup
    .string()
    .min(2, "Comment must be at least 2 characters")
    .max(1024, "Comment must be 1024 characters maximum")
    .required("Comment is required"),
});
