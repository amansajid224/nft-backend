import * as yup from "yup";
require("yup-password")(yup);

export const signUpSchema = yup.object().shape({
  email: yup.string().label("Email").email().required(),
  password: yup.string().password().label("Password").min(8).max(32).required(),
  confirm_password: yup
    .string()
    .label("Confirm password")
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  agree: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});
export const resetSchema = yup.object().shape({
  password: yup.string().password().label("Password").min(8).max(32).required(),
  confirm_password: yup
    .string()
    .label("Confirm password")
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
export const loginSchema = yup.object().shape({
  email: yup.string().label("Email").email().required(),
  password: yup.string().label("Password").min(8).max(32).required(),
});
