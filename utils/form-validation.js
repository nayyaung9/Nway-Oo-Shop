import * as yup from "yup";

const emailNotLongEnough = "Email must be at least 3 characters";
const shopNameNotLongEnough = "Store name must be at least 3 characters";
const usernameNotLongEnough = "Fullname must be at least 3 characters";
const passwordNotLongEnough = "Password must be at least 8 characters";
const invalidEmail = "Email must be a valid email";

export const registerValidator = yup.object().shape({
  shopName: yup
    .string()
    .min(3, shopNameNotLongEnough)
    .max(120)
    .required("Store name is required"),
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(100)
    .email(invalidEmail)
    .required("Email is required"),
  fullName: yup
    .string()
    .min(3, usernameNotLongEnough)
    .max(100)
    .required("Full name is required"),
  password: yup
    .string()
    .min(8, passwordNotLongEnough)
    .max(100)
    .required("Please Enter your password"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const loginValidator = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(100)
    .email(invalidEmail)
    .required("Email is required"),

  password: yup
    .string()
    .min(8, passwordNotLongEnough)
    .max(100)
    .required("Please Enter your password"),
});
