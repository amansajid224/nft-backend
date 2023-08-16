import NetworkManager from ".";

export const performRequest = async (...params) => {
  try {
    const res = await NetworkManager.performRequest(...params);
    return res.data;
  } catch (e) {
    return e;
  }
};