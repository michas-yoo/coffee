import methods from "./apiCalls.js";

export const makeRequest = async (requestName, data = null) => {
  try {
    const request = methods[requestName]?.(data);
    return Promise.resolve(request);
  } catch (e) {
    return Promise.reject(e);
  }
};
