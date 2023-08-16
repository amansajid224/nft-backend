import { GET } from "../constants"
import axios from "axios"
import Cookies from "js-cookie";

const TIMEOUT = 90 * 1000
export default class NetworkManager {

  static performRequest(url, data, method, token) {
    var headers = {
      ACCEPT: "application/json",
      Authorization: !!token ? `Bearer ${Cookies.get("token")}` : undefined,
    }

    let config = { method, url, data, headers }
    return new Promise((resolve, reject) => {
      axios(config, { timeout: TIMEOUT })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.response?.status === 401 && method === GET) {
            return
          } else {
            reject({ requestError: error })
          }
          console.log("Request Response Error", {...error} );
        })
    })
  }
}
