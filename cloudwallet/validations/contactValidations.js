import * as yup from "yup";

export const addContactSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Must be a string with no special characters")
    .label("Name")
    .required(),
  addressType: yup.string().label("Address Type").required(),
  walletAddress: yup.string().label("Wallet Address").required(),
  // email: yup.string().label("Email").email().required(),
});
