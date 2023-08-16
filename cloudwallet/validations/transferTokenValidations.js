import * as yup from "yup";

export const transferTokenValidations = yup.object().shape({
  amount: yup.string().label("Transfer amount").required(),
  walletAddress: yup.string().label("Address").required(),
});
