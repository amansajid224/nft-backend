import { DELETE, GET, POST, PUT } from "../constants"
import { performRequest } from "../networkService/requestBuilder"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

//Add Wallet Address API
export const addWalletAddressApi = (data) => {
  let url = `${baseUrl}/users/wallet-address`
  return performRequest(url, data, POST, true)
}

//Remove Wallet Address API
export const removeWalletAddressApi = (data) => {
    let url = `${baseUrl}/users/wallet-address`
    return performRequest(url, data, DELETE, true)
  }