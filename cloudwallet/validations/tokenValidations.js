import * as yup from "yup";

export const createTokenSchema = yup.object().shape({
  symbol: yup.string().label("Symbol").required(),
  decimalPlaces: yup.number().label("Decimal place").required(),
  contractAddress: yup.string().label("Token contract").required(),
  name: yup.string().label("Token name").required(),
  tokenImage: yup.string().label("Image").required(),
});
