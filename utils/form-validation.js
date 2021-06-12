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
  fbLink: yup.string().required("Please provide your facebook page link"),
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

export const productValidator = yup.object().shape({
  title: yup
    .string()
    .min(3, "Product title must be at least 3 characters")
    .max(100)
    .required("Product title is required"),
  estimatedPrice: yup.number().required("Estimated Price is required"),
  price: yup
    .string()
    .min(3, "Price must be at least 3 characters")
    .max(250)
    .required("Price is required"),

  delivery: yup
    .string()
    .min(3, "Delivery input must be at least 3 characters")
    .max(300)
    .required("Delivery Status is required"),
  payment: yup.string().max(100),
});

export const shopInformationValidator = yup.object().shape({
  shopname: yup.string().max(100).required("Shop name is required"),
  phoneNumber: yup.string().max(100).required("Phone number is required"),

  shopAddress: yup.string().max(250),

  orderSystem: yup.string().max(100),
  shortBio: yup.string().max(80, "Short Bio is up to 80 characters"),
});
