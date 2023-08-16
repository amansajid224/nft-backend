import { DELETE, GET, POST, PUT } from "../constants"
import { performRequest } from "../networkService/requestBuilder"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

//Transfer API
export const transferApi = (data) => {
  let url = `${baseUrl}/notifications`
  return performRequest(url, data, POST, true)
}
//getft
// export const transferApi = (data) => {
//   let url = `${baseUrl}/notifications`
//   return performRequest(url, data, POST, true)
// }